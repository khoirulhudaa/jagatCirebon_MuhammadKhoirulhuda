document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}