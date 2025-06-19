document.addEventListener('DOMContentLoaded', function () {
    // Highlight current page in navbar
    const navLinks = document.querySelectorAll('.navbar-menu a');
    function setCurrentLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('current');
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('current');
            }
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('current'));
            this.classList.add('current');
        });
    });
    setCurrentLink();
});