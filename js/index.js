const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Get all sidebar menu items
const menuItems = sidebar.querySelectorAll('ul li a');

// Function to close sidebar
function closeSidebarMenu() {
    sidebar.classList.remove('active');
    sidebar.style.left = '-100%';
}

// Add click event to close button
closeSidebar.addEventListener('click', closeSidebarMenu);

// Add click event to each menu item
menuItems.forEach(item => {
    item.addEventListener('click', closeSidebarMenu);
});

hamburger.addEventListener('click', () => {
    sidebar.style.left = '0';
});

closeSidebar.addEventListener('click', () => {
    sidebar.style.left = '-100%';
});

function scrollToSection(id) {
    location.hash = '#' + id;
    sidebar.style.left = '-100%';
}

// Inisialisasi feather icon jika digunakan
if (typeof feather !== 'undefined') {
    feather.replace();
}

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-audio");
    const mainContent = document.getElementById("main-content");
    const loadingBar = document.getElementById("loading-bar");
    const progressText = document.getElementById("progress-text");
    const openingModal = document.getElementById("opening-modal");
    const modalBuild = document.getElementById("modal-build");

    let progress = 0;

    // Audio setup
    if (audio) {
        audio.volume = 0.75;
        audio.muted = false;
        audio.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
    }

    // Loading progress
    const monitorResources = () => {
        const resources = performance.getEntriesByType("resource");
        const loadedResources = resources.filter((res) => res.responseEnd > 0);
        const totalResources = resources.length || 1;
        progress = Math.min((loadedResources.length / totalResources) * 100, 100);
        progressText.textContent = `${Math.round(progress)}%`;
        document.querySelector(".progress").style.width = `${progress}%`;

        if (progress === 100) {
            setTimeout(() => {
                loadingBar.style.display = "none";
                mainContent.style.display = "block";
                if (!sessionStorage.getItem("sessionOpen")) {
                    openingModal.style.display = "flex";
                }
            }, 1000);
        }
    };

    const interval = setInterval(monitorResources, 100);

    // Modal handling
    window.closeOpeningModal = function () {
        sessionStorage.setItem("sessionOpen", "true");
        openingModal.style.display = "none";
        if (audio) {
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        }
    };

    window.closeModalBuild = function () {
        modalBuild.style.display = "none";
    };

    // Scroll to top
    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Cleanup
    window.addEventListener("unload", () => {
        sessionStorage.removeItem("sessionOpen");
    });

    setTimeout(() => {
        if (!sessionStorage.getItem("sessionOpen")) {
            openingModal.style.display = "flex";
        }
        clearInterval(interval);
    }, 1000);
});

 // Initialize AOS for animations
AOS.init({
    duration: 800,
    once: true
});

// Prevent context menu on image
document.querySelector('.handphone-img').addEventListener('contextmenu', (e) => {
    e.preventDefault();
});