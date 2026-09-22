// Full-screen overlay navigation
const menuToggle = document.getElementById('menuToggle');
const overlayNav = document.getElementById('overlayNav');

function closeOverlayNav() {
    overlayNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
}

if (menuToggle && overlayNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = overlayNav.classList.toggle('open');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);
    });

    overlayNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeOverlayNav);
    });
}

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('in-view'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
