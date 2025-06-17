document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Initialize Leaflet map
    const map = L.map('map').setView([-6.7071, 108.5557], 13); // Centered on Cirebon
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([-6.7200, 108.5333]).addTo(map)
        .bindPopup('Cirebon')
        .openPopup();

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