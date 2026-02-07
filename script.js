document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Navbar Loading
    const navPlaceholder = document.getElementById('navbar-container');
    if (navPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                initNavigation(); // Initialize events after DOM is injected

                // Removed page-specific nav modifier logic as per user request
                // Instead, About page will likely use same transparent nav over a new Hero/Cover section
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
    const body = document.querySelector('body'); // Helper for locking scroll

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active'); // Animate toggle icon
            navLinks.classList.toggle('active');   // Show/hide menu
            body.classList.toggle('no-scroll');    // Lock/Unlock background scroll
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            if (body) body.classList.remove('no-scroll');
        });
    });

    // Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // On scroll, solid background
                navbar.classList.add('scrolled'); // Use CSS class for cleaner handling
                navbar.style.background = 'rgba(24, 62, 105, 0.9)'; // Fallback if class not enough
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                // Top of page
                navbar.classList.remove('scrolled');

                // IMPORTANT: Respect About page custom background logic
                if (navbar.classList.contains('about-nav')) {
                    // About page has its own background image logic in CSS
                    navbar.style.background = ''; // Clear inline so CSS background-image takes over
                    navbar.style.backdropFilter = '';
                } else {
                    // Home page or others
                    if (window.innerWidth > 900) {
                        navbar.style.background = 'transparent';
                        navbar.style.backdropFilter = 'none';
                    } else {
                        // Mobile default logic
                        navbar.style.background = 'rgba(0,0,0,0.2)';
                        navbar.style.backdropFilter = 'none';
                    }
                }
            }
        });
    }
}
