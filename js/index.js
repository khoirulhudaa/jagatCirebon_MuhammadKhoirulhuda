const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Get all sidebar menu items
const menuItems = sidebar.querySelectorAll('ul li a');

// Function to close sidebar
function closeSidebarMenu() {
    sidebar.classList.remove('active');
}

// Function to open sidebar
function openSidebarMenu() {
    sidebar.classList.add('active');
}

// Add click event to hamburger menu
hamburger.addEventListener('click', openSidebarMenu);

// Add click event to close button and menu items
closeSidebar.addEventListener('click', closeSidebarMenu);
menuItems.forEach(item => {
    item.addEventListener('click', closeSidebarMenu);
});

function scrollToSection(id) {
    location.hash = '#' + id;
    sidebar.classList.remove('active');
}

// Initialize feather icons if available
if (typeof feather !== 'undefined') {
    feather.replace();
}

// Function to attempt audio playback with fallback
function playAudio(audio) {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Fallback: Play on first user interaction (scroll, click, touch, or keypress)
            const tryPlayAudio = () => {
                audio.play().catch(err => console.error('Retry audio playback failed:', err));
                // Remove all listeners after first attempt
                document.removeEventListener('scroll', tryPlayAudio);
                document.removeEventListener('click', tryPlayAudio);
                document.removeEventListener('touchstart', tryPlayAudio);
                document.removeEventListener('keydown', tryPlayAudio);
            };
            document.addEventListener('scroll', tryPlayAudio, { once: true });
            document.addEventListener('click', tryPlayAudio, { once: true });
            document.addEventListener('touchstart', tryPlayAudio, { once: true });
            document.addEventListener('keydown', tryPlayAudio, { once: true });
        });
    }
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
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
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
                // Check localStorage for modal and audio
                if (localStorage.getItem("play") === "true") {
                    openingModal.style.display = "none";
                    if (audio) playAudio(audio);
                } else {
                    openingModal.style.display = "flex";
                }
            }, 1000);
        }
    };

    const interval = setInterval(monitorResources, 100);

    // Modal handling
    window.closeOpeningModal = function () {
        localStorage.setItem("play", "true");
        openingModal.style.display = "none";
        if (audio) {
            playAudio(audio); // User interaction allows playback
        }
    };

    window.closeModalBuild = function () {
        modalBuild.style.display = "none";
    };

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    setTimeout(() => {
        if (localStorage.getItem("play") !== "true") {
            openingModal.style.display = "flex";
        }
        clearInterval(interval);
    }, 1000);
});

document.querySelector('.handphone-img').addEventListener('contextmenu', (e) => {
    e.preventDefault();
});