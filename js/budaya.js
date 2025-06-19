document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    // Initialize Feather Icons
    feather.replace();
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}