const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Get all sidebar menu items
const menuItems = sidebar?.querySelectorAll('ul li a') || [];

// Function to close sidebar
function closeSidebarMenu() {
    sidebar?.classList.remove('active');
}

// Function to open sidebar
function openSidebarMenu() {
    sidebar?.classList.add('active');
}

// Add click event to hamburger menu
hamburger?.addEventListener('click', openSidebarMenu);

// Add click event to close button and menu items
closeSidebar?.addEventListener('click', closeSidebarMenu);
menuItems.forEach(item => {
    item.addEventListener('click', closeSidebarMenu);
});

function scrollToSection(id) {
    location.hash = '#' + id;
    closeSidebarMenu();
}

// Initialize feather icons if available
if (typeof feather !== 'undefined') {
    feather.replace();
}

document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");
    const loadingBar = document.getElementById("loading-bar");
    const openingModal = document.getElementById("opening-modal");
    const modalBuild = document.getElementById("modal-build");
    const progressBar = document.querySelector(".progress");

    // Log missing elements for debugging
    if (!progressBar) console.error("Element with class='progress' not found.");

    // Loading progress
    const monitorResources = () => {
        if (!progressBar) {
            clearInterval(interval);
            // Fallback: Show main content immediately if elements are missing
            if (loadingBar) loadingBar.style.display = "none";
            if (mainContent) mainContent.style.display = "block";
            if (openingModal) {
                openingModal.style.display = localStorage.getItem("play") === "true" ? "none" : "flex";
            }
            return;
        }

        const resources = performance.getEntriesByType("resource");
        const loadedResources = resources.filter((res) => res.responseEnd > 0);
        const totalResources = resources.length || 1;
        let progress = Math.min((loadedResources.length / totalResources) * 100, 100);
        progressBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loadingBar) loadingBar.style.display = "none";
                if (mainContent) mainContent.style.display = "block";
                if (openingModal) {
                    openingModal.style.display = localStorage.getItem("play") === "true" ? "none" : "flex";
                }
            }, 1000);
        }
    };

    // Start monitoring only after DOM is loaded
    const interval = setInterval(monitorResources, 100);

    // Modal handling
    window.closeOpeningModal = function () {
        localStorage.setItem("play", "true");
        if (openingModal) openingModal.style.display = "none";
    };

    window.closeModalBuild = function () {
        if (modalBuild) modalBuild.style.display = "none";
    };

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    setTimeout(() => {
        if (localStorage.getItem("play") !== "true" && openingModal) {
            openingModal.style.display = "flex";
        }
    }, 1000);
});

// Prevent context menu on handphone image
const handphoneImgNew = document.querySelector('.handphone-img');
if (handphoneImgNew) {
    handphoneImgNew.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}