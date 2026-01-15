// Main JS file for interactions

console.log('QD Website Loaded');

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroBg = document.querySelector('.hero-background');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});
