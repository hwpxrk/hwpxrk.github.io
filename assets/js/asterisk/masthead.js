(() => {
    const pages = document.querySelectorAll('.skip-links, .initial-content, .search-content, .page__footer');

    const header = document.querySelector('.header');
    const masthead = document.querySelector('.masthead');

    const menu = header.querySelector('.menu');
    const categories = Array.from(menu.querySelectorAll('.categories'));
    const submenus = Array.from(header.querySelectorAll('.submenu'));
    const hamburger_button = header.querySelector('.hamburger_button');
    const background = header.querySelector('.background');
    const backward_button = header.querySelector('.backward_button');
    const filter = header.querySelector('.filter');
    const search_button = header.querySelector('.search_button');
    const search_content = document.querySelector('.search-content');

    const mobile_media = window.matchMedia('(max-width: 1023px)');

    let mobile = mobile_media.matches;
    let selected = null;
    let sidepanel_open = false;
    let timer;

    const items = categories.map((button) => ({
        button: button,
        trigger: button.parentElement.querySelector('.trigger') ?? button,
        submenu: null,
        first: null,
        last: null,
    }));

    for (const content of submenus) {
        const index = Number(content.dataset.index);
        const item = items[index];
        const links = content.querySelectorAll('a');

        item.submenu = content;
        item.first = links[0];
        item.last = links[links.length - 1];
        item.trigger.setAttribute('aria-controls', content.id);
    }

    /** Hide all submenu and clear the selected category. */
    function flatten() {
        for (const item of items) {
            if (item.submenu) {
                item.submenu.hidden = true;
                item.submenu.classList.remove('interval');
                item.submenu.style.maxHeight = '';
                item.submenu.style.overflowY = '';
                item.trigger.setAttribute('aria-expanded', 'false');

                if (item.button.tagName === 'BUTTON') {
                    // Thanks Codex! You catched a freaking tag name unmatch bug... It works as I want!
                    item.button.setAttribute('aria-expanded', 'false');
                }
            }

            item.button.classList.remove('base');
        }

        selected = null;
    }

    /** Freeze or unfreeze page interactions. */
    function freeze(flag) {
        document.body.classList.toggle('freeze', flag);

        for (const page of pages) {
            page.inert = flag;
        }
    }

    /** Synchronize menu visibility, classes, and attributes with the current state. */
    function synchronize() {
        const has_submenu = selected !== null;
        const nested = has_submenu && sidepanel_open;
        const blind = has_submenu && !mobile;

        backward_button.hidden = !nested;
        background.hidden = !sidepanel_open && !blind;

        masthead.classList.toggle('nested', nested);
        masthead.classList.toggle('sidepanel_open', sidepanel_open);

        filter.hidden = !blind;
        hamburger_button.setAttribute('aria-expanded', String(sidepanel_open));

        // Thanks Codex! You catched a freaking tag name unmatch bug... It works as I want!
        for (const item of items) {
            if (!item.submenu) {
                continue;
            }

            if (mobile || item.button.tagName === 'BUTTON') {
                item.button.setAttribute('aria-controls', item.submenu.id);
                item.button.setAttribute('aria-expanded', String(!item.submenu.hidden));
            } else {
                item.button.removeAttribute('aria-controls');
                item.button.removeAttribute('aria-expanded');
            }
        }
    }

    /** Match the desktop background and clipping height to the selected submenu. */
    function measure() {
        if (mobile || selected === null) {
            // The mobile panel uses the viewport height.
            return;
        }

        const submenu = items[selected].submenu;
        const screen = Math.max(0, window.innerHeight - masthead.getBoundingClientRect().bottom);
        const height = Math.min(submenu.scrollHeight + 1, screen) + 'px';

        submenu.style.overflowY = submenu.scrollHeight + 1 > screen ? 'auto' : 'hidden';

        if (background.style.height !== height) {
            background.style.height = height;
        }

        submenu.style.maxHeight = height;
    }

    /** Close the submenu panel and return focus to its base menu if needs. */
    function close(restoration = false) {
        clearTimeout(timer);

        if (!sidepanel_open && selected === null) {
            return;
        }

        // Don't lose your focus! Save the previous button to return to when you close the submenu.
        const destination = sidepanel_open ? hamburger_button : items[selected].trigger;

        flatten();
        menu.classList.remove('interval');
        sidepanel_open = false;

        synchronize();
        background.classList.remove('interval', 'open');
        background.style.height = '';

        // Make sure that hidden state is changed.
        window.getComputedStyle(background).display;

        freeze(false);

        if (restoration && destination) {
            destination.focus();
        }
    }

    function flyout(index, focus = false) {
        clearTimeout(timer);

        const closed = selected === null;
        const item = items[index];

        if (selected === index) {
            if (focus) {
                item.first.focus();
            }

            return;
        }

        menu.classList.remove('interval');

        if (!mobile && selected !== null && items[selected].submenu.contains(document.activeElement)) {
            item.trigger.focus();
        }

        flatten();
        selected = index;
        item.submenu.hidden = false;

        background.classList.toggle('interval', closed && !mobile);
        item.submenu.classList.toggle('interval', closed && !mobile);
        item.trigger.setAttribute('aria-expanded', 'true');

        synchronize();
        item.submenu.scrollTop = 0;

        if (!mobile) {
            // Keep clipping aligned with the background, even during a rapid category switch.
            if (!closed) {
                item.submenu.style.maxHeight = window.getComputedStyle(background).height;
            }

            measure();

            if (closed) {
                window.getComputedStyle(background, '::before').transform;
            }
            background.classList.add('open');
        }

        if (focus || mobile) {
            item.first.focus();
        }
    }

    items.forEach((item, index) => {
        item.button.parentElement.addEventListener('pointerenter', () => {
            if (mobile) {
                return;
            }

            if (item.submenu) {
                flyout(index);
            } else {
                close();
            }
        });

        item.button.addEventListener('click', (event) => {
            // Thanks Codex! You catched a freaking tag name unmatch bug... It works as I want!
            if (item.submenu && (mobile || item.button.tagName === 'BUTTON')) {
                event.preventDefault();

                if (!mobile && event.detail === 0 && selected === index) {
                    close();
                } else {
                    flyout(index);
                }
            }
        });

        item.trigger.addEventListener('click', () => {
            if (item.submenu && selected !== index) {
                flyout(index);
            } else {
                close();
            }
        });
    });

    window.addEventListener('resize', measure);
    document.fonts.ready.then(measure);

    // Close the menu when escape button is pressed.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && (sidepanel_open || selected !== null)) {
            event.preventDefault();
            close(true);
        }
    });

    masthead.addEventListener('focusout', (event) => {
        const interaction = masthead.classList.contains('interaction') && masthead.matches(':hover');

        if (mobile || masthead.contains(event.relatedTarget)) {
            // I think we do not need to close the sidepanel when focus moves.
            return;
        }

        if (event.relatedTarget === null && interaction) {
            // Please... Do not close the menu when we click the label on the flyout menu!
            return;
        }

        close();
    });

    // Control Tab navigation.
    masthead.addEventListener('keydown', (event) => {
        masthead.classList.remove('interaction');

        // Let's tab dance! We don't need other keys!
        if (event.key !== 'Tab') {
            return;
        }

        if (!mobile) {
            if (selected === null) {
                // We need something to focus. select any menu, please!
                return;
            }

            const item = items[selected];
            const active = document.activeElement;

            if (!event.shiftKey && active === item.trigger) {
                // Tab.
                event.preventDefault();
                item.first.focus();
            } else if (event.shiftKey && active === item.first) {
                // Shift + Tab.
                event.preventDefault();
                item.trigger.focus();
            } else if (!event.shiftKey && active === item.last) {
                // Tab on last submenu.
                const next = categories[selected + 1] ?? search_button;

                if (next) {
                    event.preventDefault();
                    next.focus();
                    close();
                }
            } else if (event.shiftKey && active === item.trigger) {
                close();
            }

            return;
        }

        if (!sidepanel_open) {
            return;
        }

        const first = selected === null ? categories[0] : hamburger_button;
        const last = selected === null ? hamburger_button : items[selected].last;

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    masthead.addEventListener('pointerdown', () => {
        masthead.classList.add('interaction');
    });

    hamburger_button.addEventListener('click', () => {
        if (sidepanel_open) {
            close(true);

            if (search_button && search_content.classList.contains('is--visible')) {
                search_button.click();
            }

            return;
        }

        close();

        sidepanel_open = true;
        menu.classList.add('interval');

        synchronize();
        freeze(true);

        menu.scrollTop = 0;
        categories[0].focus();
    });

    // Animates and focuses to the previous selected category.
    backward_button.addEventListener('click', () => {
        const base = categories[selected];

        flatten();
        synchronize();

        base.classList.add('base');
        base.focus();
    });

    // Reset menu state when switching between desktop and mobile layouts.
    mobile_media.addEventListener('change', (event) => {
        const open = sidepanel_open || selected !== null;

        close();
        mobile = event.matches;
        synchronize();

        if (open) {
            mobile ? hamburger_button.focus() : categories[0].focus();
        }
    });

    for (const item of [menu, background, ...submenus]) {
        item.addEventListener('pointerenter', () => {
            clearTimeout(timer);
        });

        item.addEventListener('pointerleave', () => {
            if (mobile) {
                return;
            }

            clearTimeout(timer);
            timer = setTimeout(() => {
                const focused = selected !== null && items[selected].submenu.contains(document.activeElement);

                if (!focused) {
                    close();
                }
            }, 100);
        });
    }

    filter.addEventListener('click', () => {
        close(true);
    });

    if (search_button) {
        search_content.id = 'masthead_search_content';
        search_button.setAttribute('aria-controls', search_content.id);
        search_button.setAttribute('aria-expanded', 'false');
        search_button.addEventListener('click', () => {
            close();
        });

        // Synchronize search button attributes and restore focus.
        const search_observer = new MutationObserver(() => {
            const searching = search_content.classList.contains('is--visible');

            search_button.setAttribute('aria-expanded', String(searching));
            search_button.setAttribute('aria-label', searching ? '검색 닫기' : '검색 열기');

            if (!searching && search_content.contains(document.activeElement)) {
                search_button.focus();
            }
        });

        search_observer.observe(search_content, { attributes: true, attributeFilter: ['class'] });
    }
})();
