(() => {
    'use strict';

    for (const section of document.querySelectorAll('[data-pledges]')) {
        const controls = section.querySelector('[data-pledge-filters]');
        const count = section.querySelector('[data-pledge-count]');
        const pledges = Array.from(section.querySelectorAll('article[data-pledge]'));
        const buttons = Array.from(controls?.querySelectorAll('button[data-pledge-filter]') || []);
        const dialogs = Array.from(section.querySelectorAll('dialog[data-pledge-dialog]'));
        const dialog_triggers = new Map();

        if (!controls || !buttons.length || !pledges.length) {
            continue;
        }

        function apply_filter(filter_name) {
            const selected_button = buttons.find((button) => button.dataset.pledgeFilter === filter_name);

            if (!selected_button) {
                return;
            }

            let visible_count = 0;

            for (const pledge of pledges) {
                pledge.hidden = filter_name !== 'all' && pledge.dataset.category !== filter_name;

                if (!pledge.hidden) {
                    visible_count += 1;
                }
            }

            for (const button of buttons) {
                button.setAttribute('aria-pressed', String(button.dataset.pledgeFilter === filter_name));
            }

            if (count) {
                const filter_label = filter_name === 'all' ? '전체' : selected_button.textContent.trim();

                count.textContent = `${filter_label} 공약 ${visible_count}개`;
            }
        }

        for (const button of buttons) {
            button.addEventListener('click', () => {
                apply_filter(button.dataset.pledgeFilter);
                button.focus({preventScroll: true});
            });
        }

        for (const trigger of section.querySelectorAll('button[data-pledge-open]')) {
            const dialog = dialogs.find((item) => item.id === trigger.getAttribute('aria-controls'));

            if (!dialog) {
                continue;
            }

            trigger.addEventListener('click', () => {
                if (dialog.open) {
                    return;
                }

                dialog_triggers.set(dialog, trigger);
                dialog.showModal();
                dialog.scrollTop = 0;
                document.body.classList.add('dialog-open');
            });
        }

        for (const dialog of dialogs) {
            for (const close_button of dialog.querySelectorAll('button[data-pledge-close]')) {
                close_button.addEventListener('click', () => dialog.close());
            }

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

            dialog.addEventListener('close', () => {
                const another_open = Boolean(document.querySelector('dialog[open]'));
                const trigger = dialog_triggers.get(dialog);

                document.body.classList.toggle('dialog-open', another_open);

                if (!another_open && trigger?.isConnected) {
                    trigger.focus({preventScroll: true});
                }
            });
        }

        apply_filter('all');
        controls.hidden = false;
    }
})();
