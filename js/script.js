document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        const toggleMenu = (open) => {
            const isActive = open !== undefined ? open : !navMenu.classList.contains('active');
            navMenu.classList.toggle('active', isActive);
            mobileMenuBtn.classList.toggle('active', isActive);
            mobileMenuBtn.setAttribute('aria-expanded', String(isActive));
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        mobileMenuBtn.addEventListener('click', () => toggleMenu());

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Close mobile menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    // Smooth Scrolling for Anchor Links (respecting reduced motion preferences)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect (Optimized with class toggle and passive listener)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Run on initial load
    }

    // Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a.nav-link:not(.btn-primary)');
    if (sections.length && navItems.length) {
        const updateActiveNav = () => {
            const scrollPos = window.scrollY + 140;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    navItems.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }
});
