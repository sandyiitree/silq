document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Navbar Loading
    const navPlaceholder = document.getElementById('navbar-container');
    if (navPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                initNavigation(); // Initialize events after DOM is injected
            })
            .catch(error => console.error('Error loading navbar:', error));
    } else {
        // Fallback for pages with static navbar
        initNavigation();
    }
});

function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const body = document.querySelector('body');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // FIX: Prevent background scrolling and horizontal overflow
            if (isActive) {
                // body.style.overflow = 'hidden'; Replaced by no-scroll class
                body.classList.add('no-scroll');
            } else {
                // body.style.overflow = '';
                body.classList.remove('no-scroll');
            }
        });
    }

    // Close menu when clicking a link (fixes one-page nav behavior)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navLinks) {
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll'); // Release scroll lock
            }
        });
    });

    // Scroll Effect Logic
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(24, 62, 105, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.classList.remove('scrolled');

                // Handle About Page vs Home Page transparency
                if (navbar.classList.contains('about-nav')) {
                    navbar.style.background = ''; // Reverts to CSS background-image
                    navbar.style.backdropFilter = '';
                } else {
                    if (window.innerWidth > 900) {
                        navbar.style.background = 'transparent';
                        navbar.style.backdropFilter = 'none';
                    } else {
                        navbar.style.background = 'rgba(0,0,0,0.2)';
                        navbar.style.backdropFilter = 'none';
                    }
                }
            }
        });
    }
}