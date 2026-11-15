(() => {
    'use strict';

    document.documentElement.classList.add('green-js');

    const reduced_motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector('.green-header');
    const back_top = document.querySelector('[data-back-top]');
    const announcement = document.querySelector('[data-announcement]');
    const dialogs = Array.from(document.querySelectorAll('#green-search, #green-menu'));
    const dialog_triggers = new Map();

    function update_scroll_state() {
        header?.classList.toggle('is-scrolled', window.scrollY > 20);

        if (back_top) {
            back_top.hidden = window.scrollY < 600;
        }
    }

    window.addEventListener('scroll', update_scroll_state, {passive: true});
    update_scroll_state();

    back_top?.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: reduced_motion.matches ? 'instant' : 'smooth'});
    });

    function dismiss_announcement() {
        if (announcement) {
            announcement.hidden = true;
        }

        document.body.classList.add('announcement-closed');
    }

    try {
        if (sessionStorage.getItem('green-announcement-closed') === 'true') {
            dismiss_announcement();
        }
    } catch {
        // Closing the announcement still works when browser storage is unavailable.
    }

    document.querySelector('[data-banner-close]')?.addEventListener('click', () => {
        dismiss_announcement();

        try {
            sessionStorage.setItem('green-announcement-closed', 'true');
        } catch {
            // Storage is optional; the current page already reflects the action.
        }
    });

    function open_dialog(dialog, trigger) {
        if (!dialog || dialog.open) {
            return;
        }

        for (const other_dialog of dialogs) {
            if (other_dialog.open) {
                other_dialog.close();
            }
        }

        dialog_triggers.set(dialog, trigger);
        dialog.showModal();
        trigger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('dialog-open');

        if (dialog.id === 'green-search') {
            dialog.querySelector('[data-search-input]')?.focus();
        }
    }

    for (const [selector, dialog_id] of [
        ['[data-search-open]', 'green-search'],
        ['[data-menu-open]', 'green-menu'],
    ]) {
        for (const trigger of document.querySelectorAll(selector)) {
            trigger.addEventListener('click', () => {
                open_dialog(document.getElementById(dialog_id), trigger);
            });
        }
    }

    for (const dialog of dialogs) {
        dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !event.isComposing) {
                event.preventDefault();
                dialog.close();
            }
        }, true);

        dialog.addEventListener('close', () => {
            const trigger = dialog_triggers.get(dialog);
            const another_open = dialogs.some((other_dialog) => other_dialog.open);

            document.body.classList.toggle('dialog-open', another_open);
            trigger?.setAttribute('aria-expanded', 'false');

            if (!another_open && trigger?.isConnected) {
                trigger.focus({preventScroll: true});
            }
        });

        dialog.addEventListener('click', (event) => {
            if (event.target !== dialog) {
                return;
            }

            const bounds = dialog.getBoundingClientRect();
            const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
                event.clientY < bounds.top || event.clientY > bounds.bottom;

            if (outside) {
                dialog.close();
            }
        });

        for (const close_button of dialog.querySelectorAll('[data-dialog-close]')) {
            close_button.addEventListener('click', () => dialog.close());
        }

        if (dialog.id === 'green-menu') {
            for (const link of dialog.querySelectorAll('a[href]')) {
                link.addEventListener('click', () => dialog.close());
            }
        }
    }

    const search_form = document.querySelector('[data-search-form]');
    const search_input = document.querySelector('[data-search-input]');
    const search_results = document.querySelector('[data-search-results]');
    const search_status = document.querySelector('[data-search-status]');
    const search_empty = document.querySelector('[data-search-empty]');
    const search_clear = document.querySelector('[data-search-clear]');
    const search_data = document.getElementById('green-search-data');

    if (search_input && search_results && search_data) {
        let search_items = [];
        let search_timer;
        let search_available = true;

        function normalize_text(value) {
            return String(value ?? '').normalize('NFKC').toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ').trim();
        }

        try {
            const parsed_items = JSON.parse(search_data.textContent);

            if (!Array.isArray(parsed_items)) {
                throw new TypeError('Search data must be an array.');
            }

            search_items = parsed_items.filter((item) => item && typeof item.url === 'string').map((item) => ({
                ...item,
                search_text: normalize_text([item.title, item.description, item.content, item.category].join(' ')),
            }));
        } catch {
            search_available = false;
        }

        function render_search() {
            clearTimeout(search_timer);
            const query = normalize_text(search_input.value);

            search_results.replaceChildren();

            if (search_clear) {
                search_clear.hidden = !search_input.value;
            }

            if (search_empty) {
                search_empty.hidden = true;
            }

            if (!search_available) {
                if (search_status) {
                    search_status.textContent = '검색을 불러오지 못했습니다. 메뉴에서 원하는 페이지를 확인해 주세요.';
                }

                return;
            }

            if (!query) {
                if (search_status) {
                    search_status.textContent = '키워드로 초록의 이야기를 찾아보세요.';
                }

                return;
            }

            const query_terms = query.split(' ');
            const matches = search_items.filter((item) => query_terms.every((term) => item.search_text.includes(term)));

            if (search_status) {
                search_status.textContent = `${matches.length}개의 이야기를 찾았습니다.`;
            }

            if (search_empty) {
                search_empty.hidden = matches.length !== 0;
            }

            const result_fragment = document.createDocumentFragment();

            for (const item of matches) {
                const result = document.createElement('li');
                const link = document.createElement('a');
                const category = document.createElement('span');
                const title = document.createElement('h3');
                const description = document.createElement('p');

                result.className = 'green-search-result';
                link.href = item.url;
                category.className = 'green-search-result-category';
                category.textContent = item.category || '초록';
                title.className = 'green-search-result-title';
                title.textContent = item.title || '초록의 이야기';
                description.className = 'green-search-result-description';
                description.textContent = item.description || '';
                link.append(category, title, description);
                result.append(link);
                result_fragment.append(result);
            }

            search_results.append(result_fragment);
        }

        search_input.addEventListener('input', (event) => {
            if (event.isComposing) {
                return;
            }

            clearTimeout(search_timer);
            search_timer = setTimeout(render_search, 120);
        });

        search_input.addEventListener('compositionend', render_search);
        search_form?.addEventListener('submit', (event) => {
            event.preventDefault();
            render_search();
        });

        search_clear?.addEventListener('click', () => {
            search_input.value = '';
            render_search();
            search_input.focus();
        });

        for (const keyword of document.querySelectorAll('[data-search-keyword]')) {
            keyword.addEventListener('click', () => {
                search_input.value = keyword.dataset.searchKeyword || keyword.textContent.trim();
                render_search();
                search_input.focus();
            });
        }

        render_search();
    }

    const hero = document.querySelector('[data-hero]');

    if (hero) {
        const slides = Array.from(hero.querySelectorAll('[data-slide]'));
        const dots = Array.from(hero.querySelectorAll('[data-slide-to]'));
        const pause_button = hero.querySelector('[data-slide-pause]');
        const slide_current = hero.querySelector('[data-slide-current]');
        let slide_index = 0;
        let user_paused = false;
        let focus_inside = false;
        let ignore_current_focus = false;
        let slide_timer;
        let slide_animations = [];
        let touch_start = null;
        let suppress_click = false;

        function update_playback() {
            clearTimeout(slide_timer);
            const can_play = slides.length > 1 && !user_paused &&
                (!focus_inside || ignore_current_focus) &&
                !document.hidden && !dialogs.some((dialog) => dialog.open);

            hero.classList.toggle('is-playing', can_play);
            hero.dataset.paused = String(user_paused);

            if (pause_button) {
                pause_button.setAttribute('aria-pressed', String(user_paused));
                pause_button.setAttribute('aria-label', user_paused ? '슬라이드 자동 재생 시작' : '슬라이드 자동 재생 일시 정지');
                pause_button.dataset.paused = String(user_paused);
            }

            if (can_play) {
                slide_timer = setTimeout(() => show_slide(slide_index + 1), 5000);
            }
        }

        function cancel_slide_animations() {
            for (const animation of slide_animations) {
                animation.cancel();
            }

            slide_animations = [];
        }

        function show_slide(next_index, manual = false) {
            if (!slides.length) {
                return;
            }

            if (manual) {
                ignore_current_focus = false;
            }

            const previous_index = slide_index;
            const direction = next_index < previous_index ? -1 : 1;

            slide_index = (next_index + slides.length) % slides.length;
            cancel_slide_animations();

            if (previous_index !== slide_index && slides[previous_index].contains(document.activeElement)) {
                hero.focus({preventScroll: true});
            }

            for (const [index, slide] of slides.entries()) {
                const active = index === slide_index;

                slide.hidden = false;
                slide.inert = !active;
                slide.setAttribute('aria-hidden', String(!active));
            }

            if (previous_index !== slide_index && !reduced_motion.matches) {
                const slide_distance = hero.clientWidth;
                const animation_options = {duration: 500, easing: 'cubic-bezier(.22, .61, .36, 1)'};

                slide_animations = [
                    slides[previous_index].animate([
                        {transform: 'translateX(0)', visibility: 'visible'},
                        {transform: `translateX(${-direction * slide_distance}px)`, visibility: 'visible'},
                    ], animation_options),
                    slides[slide_index].animate([
                        {transform: `translateX(${direction * slide_distance}px)`},
                        {transform: 'translateX(0)'},
                    ], animation_options),
                ];
            }

            for (const dot of dots) {
                const active = Number(dot.dataset.slideTo) === slide_index;

                dot.classList.toggle('is-active', active);
                dot.setAttribute('aria-current', String(active));
            }

            hero.dataset.theme = slides[slide_index].dataset.theme || 'green';

            if (slide_current) {
                slide_current.textContent = String(slide_index + 1).padStart(2, '0');
            }

            update_playback();
        }

        hero.querySelector('[data-slide-prev]')?.addEventListener('click', () => show_slide(slide_index - 1, true));
        hero.querySelector('[data-slide-next]')?.addEventListener('click', () => show_slide(slide_index + 1, true));

        for (const dot of dots) {
            dot.addEventListener('click', () => show_slide(Number(dot.dataset.slideTo), true));
        }

        pause_button?.addEventListener('click', () => {
            user_paused = !user_paused;
            // A deliberate play action takes precedence over the focus that activated it.
            ignore_current_focus = !user_paused && focus_inside;
            update_playback();
        });

        hero.addEventListener('focusin', () => {
            focus_inside = true;
            ignore_current_focus = false;
            update_playback();
        });

        hero.addEventListener('focusout', (event) => {
            focus_inside = hero.contains(event.relatedTarget);
            ignore_current_focus = false;
            update_playback();
        });

        hero.addEventListener('keydown', (event) => {
            if (event.target.closest('a, button, input, textarea, select')) {
                return;
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                show_slide(slide_index + (event.key === 'ArrowLeft' ? -1 : 1), true);
            }
        });

        hero.addEventListener('pointerdown', (event) => {
            if (!event.target.closest('[data-slide-pause]')) {
                ignore_current_focus = false;
                update_playback();
            }

            if (event.pointerType === 'touch') {
                touch_start = {x: event.clientX, y: event.clientY};
                suppress_click = false;
            }
        }, {passive: true});

        hero.addEventListener('pointerup', (event) => {
            if (!touch_start) {
                return;
            }

            const distance_x = event.clientX - touch_start.x;
            const distance_y = event.clientY - touch_start.y;

            touch_start = null;

            if (Math.abs(distance_x) > 60 && Math.abs(distance_x) > Math.abs(distance_y) * 1.5) {
                suppress_click = true;
                show_slide(slide_index + (distance_x > 0 ? -1 : 1), true);
            }
        }, {passive: true});

        hero.addEventListener('pointercancel', () => {
            touch_start = null;
        });

        hero.addEventListener('click', (event) => {
            if (suppress_click) {
                event.preventDefault();
                event.stopPropagation();
                suppress_click = false;
            }
        }, true);

        document.addEventListener('visibilitychange', update_playback);
        reduced_motion.addEventListener('change', () => {
            if (reduced_motion.matches) {
                cancel_slide_animations();
            }
        });

        for (const dialog of dialogs) {
            const dialog_observer = new MutationObserver(update_playback);

            dialog_observer.observe(dialog, {attributes: true, attributeFilter: ['open']});
        }

        show_slide(0);
    }

    for (const rail of document.querySelectorAll('[data-rail]')) {
        const track = rail.querySelector('.green-card-track');
        const previous = rail.querySelector('[data-rail-prev]');
        const next = rail.querySelector('[data-rail-next]');

        if (!track) {
            continue;
        }

        function update_rail() {
            if (previous) {
                previous.disabled = track.scrollLeft <= 2;
            }

            if (next) {
                next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
            }
        }

        function scroll_rail(direction) {
            const card = track.firstElementChild;
            const next_card = card?.nextElementSibling;
            const card_width = card?.getBoundingClientRect().width || track.clientWidth;
            const step = next_card ? next_card.offsetLeft - card.offsetLeft : card_width;

            track.scrollBy({left: step * direction, behavior: reduced_motion.matches ? 'instant' : 'smooth'});
        }

        previous?.addEventListener('click', () => scroll_rail(-1));
        next?.addEventListener('click', () => scroll_rail(1));
        track.addEventListener('scroll', update_rail, {passive: true});

        const rail_observer = new ResizeObserver(update_rail);

        rail_observer.observe(track);
        update_rail();
    }

    for (const share_button of document.querySelectorAll('[data-share]')) {
        share_button.addEventListener('click', async () => {
            const share_status = document.querySelector('[data-share-status]');

            if (share_status) {
                share_status.textContent = '';
            }

            try {
                if (navigator.share) {
                    await navigator.share({title: document.title, url: window.location.href});
                } else if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(window.location.href);

                    if (share_status) {
                        share_status.textContent = '페이지 주소를 복사했습니다.';
                    }
                } else if (share_status) {
                    share_status.textContent = '주소창의 페이지 주소를 복사해 공유해 주세요.';
                }
            } catch (error) {
                if (error.name !== 'AbortError' && share_status) {
                    share_status.textContent = '공유하지 못했습니다. 주소창의 페이지 주소를 복사해 주세요.';
                }
            }
        });
    }
})();
