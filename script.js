(function () {
    'use strict';

    /* =========================
       SCROLL REVEAL
    ========================= */

    var revealSelectors = [
        '.hero-stats',
        '.trust-strip',
        '.section-heading',
        '.pricing-heading',
        '.service-card',
        '.project',
        '.price-card',
        '.process-step',
        '.faq-layout',
        '.cta-inner'
    ];

    var revealEls = document.querySelectorAll(revealSelectors.join(','));

    if ('IntersectionObserver' in window && revealEls.length) {
        revealEls.forEach(function (el) {
            el.classList.add('reveal');
        });

        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    /* =========================
       MAGNETIC BUTTONS + CUSTOM CURSOR
       (mouse-only devices — never on touch)
    ========================= */

    var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (supportsHover) {

        /* magnetic buttons */
        var magneticEls = document.querySelectorAll('.button.primary, .cta-button');
        var MAGNETIC_PADDING = 24;
        var MAGNETIC_MAX_OFFSET = 9;

        if (magneticEls.length) {
            document.addEventListener('mousemove', function (e) {
                magneticEls.forEach(function (el) {
                    var rect = el.getBoundingClientRect();
                    var withinX = e.clientX >= rect.left - MAGNETIC_PADDING && e.clientX <= rect.right + MAGNETIC_PADDING;
                    var withinY = e.clientY >= rect.top - MAGNETIC_PADDING && e.clientY <= rect.bottom + MAGNETIC_PADDING;

                    if (withinX && withinY) {
                        var centerX = rect.left + rect.width / 2;
                        var centerY = rect.top + rect.height / 2;
                        var dx = ((e.clientX - centerX) / (rect.width / 2 + MAGNETIC_PADDING)) * MAGNETIC_MAX_OFFSET;
                        var dy = ((e.clientY - centerY) / (rect.height / 2 + MAGNETIC_PADDING)) * MAGNETIC_MAX_OFFSET;
                        el.style.transform = 'translate(' + dx.toFixed(2) + 'px, ' + dy.toFixed(2) + 'px)';
                    } else if (el.style.transform) {
                        el.style.transform = '';
                    }
                });
            });
        }

        /* custom cursor */
        var cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor';
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', function (e) {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorDot.classList.add('cursor-active');
        });

        document.addEventListener('mouseleave', function () {
            cursorDot.classList.remove('cursor-active');
        });

        var clickableSelector = 'a, button, summary';

        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(clickableSelector)) {
                cursorDot.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(clickableSelector)) {
                cursorDot.classList.remove('cursor-hover');
            }
        });
    }
})();
