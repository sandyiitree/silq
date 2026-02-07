document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll handling for anchor links if needed (CSS scroll-behavior handles most)
    // Add header background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(24, 62, 105, 0.9)'; // Primary blue with opacity
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            // Check if we are on a page where it should be transparent initially
            // For now, reset to original state (transparent or whatever CSS defined)
            if (window.innerWidth > 900) {
                 navbar.style.background = 'transparent';
                 navbar.style.backdropFilter = 'none';
            } else {
                 navbar.style.background = 'rgba(0,0,0,0.2)'; // Mobile default
                 navbar.style.backdropFilter = 'none';
            }
        }
    });
});
