
const audio = new Audio('./assets/audio/crb.mp4');
const playPauseBtn = document.getElementById('playPause');
const playPauseBtn2 = document.getElementById('playPause2');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
let isPlaying = false;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '▶ Mulai suara';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '❚❚ Hnentikan suara';
    }
    isPlaying = !isPlaying;
});

// Play/Pause functionality
playPauseBtn2.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn2.innerHTML = '▶ Mulai suara';
    } else {
        audio.play();
        playPauseBtn2.innerHTML = '❚❚ hentikan suara';
    }
    isPlaying = !isPlaying;
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update time display
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

// Progress bar click
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Volume control
document.querySelector('.volume-bar')?.addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    audio.volume = volume;
});


// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Set initial volume
audio.volume = 1;

// Set duration when metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});


// Data for each category
const data = {
    kesenian: {
        title: "Kesenian Tradisional Cirebon",
        items: [
            "Tari Topeng Cirebon",
            "Wayang Kulit Cirebon",
            "Seni Tarling",
            "Gamelan Cirebon",
            "Seni Lukis Kaca",
            "Seni Batik",
            "Seni Musik Tradisional",
            "Seni Teater Tradisional",
            "Seni Kaligrafi"
        ]
    },
    keraton: {
        title: "Keraton di Cirebon",
        items: [
            "Keraton Kasepuhan",
            "Keraton Kanoman",
            "Keraton Kacirebonan",
            "Keraton Keprabon"
        ]
    },
    batik: {
        title: "Motif Batik Khas Cirebon",
        items: [
            "Motif Mega Mendung",
            "Motif Wadasan",
            "Motif Paksi Naga Liman",
            "Motif Patran Keris",
            "Motif Singa Payung",
            "Motif Taman Arum",
            "Motif Kapal Kandas",
            "Motif Naga Seba",
            "Motif Burung Hong",
            "Motif Kembang Sepatu",
            "Motif Teratai",
            "Motif Kawung",
            "Motif Parang Rusak",
            "Motif Sumping",
            "Motif Gunung Giwur",
            "Motif Sawat",
            "Motif Ceplok",
            "Motif Truntum"
        ]
    },
    makanan: {
        title: "Makanan Khas Cirebon",
        items: [
            "Nasi Jamblang",
            "Empal Gentong",
            "Tahu Gejrot",
            "Docang",
            "Sate Kalong",
            "Mie Koclok",
            "Nasi Lengko",
            "Bubur Sop Ayam",
            "Kerupuk Melarat",
            "Sirup Tjampolay"
        ]
    }
};

// Get modal elements
const modalCRB = document.getElementById('infoModal');
const modalList = document.getElementById('modalList');
const closeButtonCRB = document.querySelector('.close-buttonCRB');
const buttonsCRB = document.querySelectorAll('.button8');

// Add click event to each button
buttonsCRB.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        const categoryData = data[category];

        // Set modal content
        modalList.innerHTML = '';
        categoryData.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalList.appendChild(li);
        });

        // Show modal
        modalCRB.style.display = 'flex';
    });
});

// Close modal when close button is clicked
closeButtonCRB.addEventListener('click', () => {
    modalCRB.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modalCRB) {
        modalCRB.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalCRB.style.display === 'flex') {
        modalCRB.style.display = 'none';
    }
});


// Initialize Feather Icons
feather.replace();

document.addEventListener('DOMContentLoaded', function () {
    const videoButtons = document.querySelectorAll('.button-container9');
    const modal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const closeModal = document.querySelector('.modal-close9');

    // Open modal with video
    videoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            const videoUrl = card.getAttribute('data-video');
            if (videoUrl) {
                videoIframe.setAttribute('src', videoUrl);
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', function () {
        modal.classList.remove('active');
        videoIframe.setAttribute('src', ''); // Stop video
        document.body.classList.remove('modal-open');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            videoIframe.setAttribute('src', ''); // Stop video
            document.body.classList.remove('modal-open');
        }
    });

    // Highlight current page in navbar
    const navLinks = document.querySelectorAll('.navbar-menu a');
    function setCurrentLink() {
        const currentHash = window.location.hash || '';
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('current');
            const href = link.getAttribute('href');
            if ((href.includes('#cerita') && currentHash === '#cerita') || href === currentPath) {
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
    window.addEventListener('hashchange', setCurrentLink);
});


    document.addEventListener('DOMContentLoaded', function () {
        const navLinks = document.querySelectorAll('nav .menu ul li a, .sidebar ul li a');
        let isScrolling = false;

        // Function to set the current link
        function setCurrentLink(hash) {
            navLinks.forEach(link => link.classList.remove('current'));
            if (hash && hash !== '#') {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === hash) {
                        link.classList.add('current');
                    }
                });
            }
        }

        // Handle clicks on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                setCurrentLink(href);
                // Allow default behavior (scroll to section)
            });
        });

        // Handle initial load and hash changes
        function handleHashChange() {
            const currentHash = window.location.hash || '#';
            setCurrentLink(currentHash);
        }
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        // Debounce scroll event
        function debounce(func, wait) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        // Handle scroll to update current link
        window.addEventListener('scroll', debounce(function () {
            if (isScrolling) return; // Skip if scrolling programmatically
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 50) { // Adjusted threshold
                    currentSection = '#' + section.getAttribute('id');
                }
            });

            // Only update if different from current hash
            if (currentSection && currentSection !== window.location.hash) {
                setCurrentLink(currentSection);
            }
        }, 100));
    });


    document.addEventListener('DOMContentLoaded', () => {
        // Progress Bar and Opening Modal Logic with LocalStorage
        const progressFill = document.querySelector('#progress-fill');
        const containerLoad = document.querySelector('.container-load');
        const mainContent = document.querySelector('#main-content');
        const openingModal = document.getElementById('opening-modal');
        const TOKEN_KEY = 'jagatCirebonVisited';

        // Debug: Log token status and initial body class
        const hasVisited = localStorage.getItem(TOKEN_KEY);
        console.log(`Token '${TOKEN_KEY}' exists: ${hasVisited}`);
        console.log(`Initial body classList: ${document.body.classList}`);

        if (!hasVisited) {
            // First visit: Show loading screen and modal
            console.log('First visit: Showing container-load and opening-modal');
            containerLoad.style.display = 'flex';
            openingModal.style.display = 'flex';
            document.body.classList.add('modal-open'); // Disable scrolling
            console.log('Added modal-open class to body');

            let progress = 0;
            progressFill.style.width = '0%';

            function updateProgress(newProgress) {
                progress = Math.max(0, Math.min(newProgress, 100));
                progressFill.style.width = `${progress}%`;
                console.log(`Progress bar: ${progress}%`);

                if (progress >= 100) {
                    containerLoad.style.display = 'none';
                    mainContent.style.display = 'block';
                    // Save token after progress completes
                    localStorage.setItem(TOKEN_KEY, 'true');
                    console.log('Token saved after progress complete');
                    // Ensure modal-open is removed
                    document.body.classList.remove('modal-open');
                    console.log('Removed modal-open class after progress complete');
                }
            }

            // Simulate progress (20% every 400ms)
            let simulatedProgress = 0;
            const interval = setInterval(() => {
                simulatedProgress += 20;
                updateProgress(simulatedProgress);
                if (simulatedProgress >= 100) {
                    clearInterval(interval);
                }
            }, 400);

            // Update closeOpeningModal to save token and restore scrolling
            window.closeOpeningModal = function() {
                openingModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                console.log('Removed modal-open class after modal closed');
                // Save token when modal is closed
                localStorage.setItem(TOKEN_KEY, 'true');
                console.log('Token saved after modal closed');
                // Ensure main content is visible if not already
                if (progress < 100) {
                    containerLoad.style.display = 'none';
                    mainContent.style.display = 'block';
                }
            };
        } else {
            // Returning visit: Skip loading screen and modal
            console.log('Returning visit: Hiding container-load and opening-modal');
            containerLoad.style.display = 'none';
            openingModal.style.display = 'none';
            mainContent.style.display = 'block';
            // Ensure modal-open is removed
            document.body.classList.remove('modal-open');
            console.log('Ensured modal-open class is removed for returning visit');

            // Inject CSS to force modal to stay hidden
            const style = document.createElement('style');
            style.id = 'modal-hider';
            style.textContent = `#opening-modal { display: none !important; }`;
            document.head.appendChild(style);
            console.log('Injected CSS to force hide opening-modal');

            // Mutation observer to prevent modal from being shown
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'style' && openingModal.style.display !== 'none') {
                        console.log('Detected attempt to show opening-modal; forcing hide');
                        openingModal.style.display = 'none';
                        document.body.classList.remove('modal-open');
                        console.log('Removed modal-open class due to mutation');
                    }
                });
            });
            observer.observe(openingModal, { attributes: true });

            // Fallback: Force restore scrolling
            document.body.style.overflow = 'auto';
            console.log('Forced body overflow to auto to restore scrolling');
        }

        // Existing modal step navigation
        window.showStep = function(step) {
            document.getElementById('step-0').style.display = step === 0 ? 'flex' : 'none';
            document.getElementById('step-1').style.display = step === 1 ? 'block' : 'none';
            const dots = document.querySelectorAll('.nav-dots .dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === step));
        };
    });


    // JavaScript for image animation, active item handling, and dynamic Google Maps button
    const listItems3 = document.querySelectorAll('.list-item');
    const handphoneImg3 = document.querySelector('.handphone-img');
    const googleMapsLink = document.getElementById('google-maps-link');

    const content3 = {
        'kasepuhan': {
            title: 'Keraton Kasepuhan',
            mapQuery: 'Keraton+Kasepuhan+Cirebon'
        },
        'kanoman': {
            title: 'Keraton Kanoman',
            mapQuery: 'Keraton+Kanoman+Cirebon'
        },
        'sunyaragi': {
            title: 'Gua Sri Sunyaragi',
            mapQuery: 'Gua+Sri+Sunyaragi+Cirebon'
        },
        'masjid-agung': {
            title: 'Masjid Agung',
            mapQuery: 'Masjid+Agung+Sang+Cipta+Rasa+Cirebon'
        },
        'batik-trusmi': {
            title: 'Pasar Batik Trusmi',
            mapQuery: 'Pasar+Batik+Trusmi+Cirebon'
        }
    };

    let currentSiteId = 'kasepuhan'; // Default selection

    // Initialize Google Maps button with default
    googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${content3[currentSiteId].mapQuery}`;
    googleMapsLink.childNodes[0].textContent = `Deleng nang Google Maps ${content3[currentSiteId].title}`;

    listItems3.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            listItems3.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            // Update current site ID
            currentSiteId = item.getAttribute('data-site');
            // Change image source and alt text
            const newImage = item.getAttribute('data-image');
            const newAlt = item.textContent.trim();
            handphoneImg3.src = newImage;
            handphoneImg3.alt = newAlt;
            setTimeout(() => {
                handphoneImg3.classList.add('visible');
            }, 100);
            // Update Google Maps button
            googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${content3[currentSiteId].mapQuery}`;
            googleMapsLink.childNodes[0].textContent = `Lihat di Google Maps ${content3[currentSiteId].title}`;
        });
    });


    const listItems = document.querySelectorAll('.list-item');
    const handphoneImg = document.querySelector('.handphone-img');

    listItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            listItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            // Change image source and alt text
            const newImage = item.getAttribute('data-image');
            const newAlt = item.textContent;
            handphoneImg.src = newImage;
            handphoneImg.alt = newAlt;
        });
    });

    const modal = document.getElementById('modal2');
    const modalTitle = document.getElementById('modal-title2');
    const modalDescription = document.getElementById('modal-description2');
    const closeButton = document.querySelector('.close-button2');
    const buttons = document.querySelectorAll('.arts-button');

    const content = {
        'tarling': {
            title: 'Tarling Cirebonan',
            description: 'Tarling Cirebonan minangka kesenian musik tradisional khas Cirebon sing nggabungake alat musik suling lan gitar kanthi vokal sing unik. Kesenian iki asalé saka pesisir Cirebon lan asringgambarake crita-crita sosial, cinta, lan kasangsaran masyarakat lokal. Tarling dikenal amarga irama sing lembut nanging ekspresif, nggawa nuansa budaya pesisir sing kaya lan dinamis.'
        },
        'tari-topeng': {
            title: 'Tari Topeng',
            description: 'Tari Topeng Cirebon minangka salah sawijining bentuk tari tradisional sing misuwur ing Jawa Barat. Tari iki nggunakake topeng kanthi karakter sing béda-béda, saben topeng nggambarake karakter lan crita sing unik. Gerakan tari sing alus lan penuh makna iki asring nggawa filosofi urip, kayata kasetyan, keberanian, utawa kasangsaran. Tari Topeng uga asring dipentaske ing upacara adat lan festival budaya.'
        },
        'genjring': {
            title: 'Genjring',
            description: 'Genjring minangka kesenian musik ritmis sing asalé saka Cirebon, nggunakake alat musik perkusi kayata kendang, rebana, lan genjring. Kesenian iki asring dipentaske kanggo nyanyi lagu-lagu religius utawa sosial, nggambarake semangat komunitas lan solidaritas. Irama sing dinamis lan energetik ndadekake Genjring dadi salah sawijining kesenian sing disenengi ing acara-acara rakyat lan upacara tradisional.'
        }
    };

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            modalTitle.textContent = content[modalId].title;
            modalDescription.textContent = content[modalId].description;
            modal.style.display = 'flex';
            document.body.classList.add('modal-open'); // Add class to disable scrolling
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Remove class to restore scrolling
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Remove class to restore scrolling
        }
    });

    // Progress Bar Logic
    let progress = 0;
    const progressFill = document.querySelector('#progress-fill');
    const containerLoad = document.querySelector('.container-load');
    const mainContent = document.querySelector('#main-content');

    // Initialize progress bar to 0%
    progressFill.style.width = '%';

    function updateProgress(newProgress) {
        progress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
        progressFill.style.width = `${progress}%`;
        console.log(`Progress bar: ${progress}%`); // Debug log

        // Hide loading screen and show main content when progress reaches 100%
        if (progress >= 100) {
            containerLoad.style.display = 'none';
            mainContent.style = 'block';
        };
    }

    // Simulate progress
    let simulatedProgress = 0;
    const interval2 = setInterval(() => {
        simulatedProgress += 20; // Increment by 40
        updateProgress(simulatedProgress);
        if (simulatedProgress >= 100) {
            clearInterval(interval2);
        };
    }, 400);

    function showStep(step) {
        document.getElementById('step-0').style.display = step === 0 ? 'block' : 'none';
        document.getElementById('step-1').style.display = step === 1 ? 'block' : 'none';
        const dots = document.querySelectorAll('.nav-dots .dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === step));
    }

    function closeOpeningModal() {
        document.getElementById('opening-modal').style.display = 'none';
        localStorage.setItem('play', 'true');
    }

    // Check localStorage on page load
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('opening-modal');
        if (localStorage.getItem('play') === 'true') {
            modal.style.display = 'none'; // Skip modal if play is true
        } else {
            modal.style.display = 'block'; // Show modal on first visit
        }
    });

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    let activeIndex = null;

    function toggleCollapse(index) {
        const answer = document.getElementById(`faq-${index}`);
        if (activeIndex === index) {
            answer.classList.remove('active');
            activeIndex = null;
        } else {
            if (activeIndex !== null) {
                document.getElementById(`faq-${activeIndex}`).classList.remove('active');
            }
            answer.classList.add('active');
            activeIndex = index;
        }
    }

    const images = [
        {
            src: "/fest1.jpg",
            title: "Keraton Nusantara Cirebon",
            desc: "Diadakan secara rutin oleh kraton-kraton yang ada di Cirebon."
        },
        {
            src: "/fest2.jpg",
            title: "Sekaten Cirebon",
            desc: "Sekaten diadakan dengan gamelan Sekaten dan pasar rakyat."
        },
        {
            src: "/fest3.jpg",
            title: "Batik Mega Mendung",
            desc: "Acara ini memang ada sebagai bentuk promosi batik Cirebon."
        },
        {
            src: "/fest4.jpeg",
            title: "Festival Jalur Rempah",
            desc: "Mengenang jalur perdagangan rempah Nusantara melalui seni."
        },
        {
            src: "/fest5.jpg",
            title: "Hari jadi Cirebon",
            desc: "Acara dalam rangka memperingati terbentuknya wilayah Cirebon."
        }
    ];

    let currentIndex = 0;
    const carouselImages = document.querySelectorAll('.carousel-images img');
    const titleElement = document.getElementById('carousel-title');
    const descElement = document.getElementById('carousel-desc');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');

    function showImage(index) {
        carouselImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        if (titleElement) titleElement.textContent = images[index].title;
        if (descElement) descElement.textContent = images[index].desc;
    }

    // Check for required elements
    if (!prevButton || !nextButton || !titleElement || !descElement || !carouselImages.length) {
        console.error('Carousel elements missing:', {
            prevButton: !prevButton,
            nextButton: !nextButton,
            titleElement: !titleElement,
            descElement: !descElement,
            carouselImages: !carouselImages.length
        });
    } else {
        showImage(currentIndex);

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 3000);

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        window.addEventListener('unload', () => {
            clearInterval(interval);
        });
    }

    function toggleGallery() {
    const popup = document.getElementById('galleryPopup');
    popup.classList.toggle('active');
    }

    // Prevent context menu on images
    document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    });

    document.addEventListener('DOMContentLoaded', () => {

    // Carousel Functionality
    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
        });
    }

    // Initial display
    showImage(currentIndex);

    // Autoplay
    const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 3000);

    // Manual Navigation
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    if (!prevButton || !nextButton) {
        console.error('Navigation buttons not found');
        return;
    }

    prevButton.addEventListener('click', () => {
        console.log('Prev button clicked');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Cleanup
    window.addEventListener('unload', () => {
        clearInterval(interval);
    });
});

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Button clicked:', button.textContent);
    });
});

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Button clicked: Play video');
    });
});