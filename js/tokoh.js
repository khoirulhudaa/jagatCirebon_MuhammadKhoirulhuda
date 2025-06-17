document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    window.scrollTo(0, 0);

    // Initialize Feather Icons
    feather.replace();
});

const figureDetails = {
    walangsungsang: {
        title: "Pangeran Walangsungsang",
        description: "Pendiri Kesultanan Cirebon pada tahun 1430. Putra Prabu Siliwangi dan Nyai Subang Larang, ia dikenal sebagai Haji Abdullah Iman setelah menunaikan ibadah haji. Ia mendirikan istana Pakungwati dan memulai penyebaran Islam di Cirebon."
    },
    sunanGunungJati: {
        title: "Sunan Gunung Jati",
        description: "Anggota Wali Songo dan keponakan Pangeran Walangsungsang. Memimpin Cirebon dari 1479 hingga 1568, ia membawa kesultanan ke masa kejayaan melalui perdagangan, ekspansi wilayah, dan penyebaran Islam. Ia juga pendiri Kesultanan Banten."
    },
    kiGedengTapa: {
        title: "Ki Gedeng Tapa",
        description: "Tokoh awal yang mendirikan dukuh Caruban, cikal bakal Cirebon. Kakek Pangeran Walangsungsang, ia membuka wilayah pesisir yang kemudian menjadi pelabuhan penting di Cirebon."
    },
    kiDanusela: {
        title: "Ki Danusela",
        description: "Kuwu pertama Caruban, diangkat sebagai penghormatan oleh masyarakat. Ia berperan dalam pembentukan komunitas awal di Kebon Pesisir sebelum pemerintahan Pangeran Walangsungsang."
    },
    nyaiRaraSantang: {
        title: "Nyai Rara Santang",
        description: "Putri Prabu Siliwangi dan saudari Pangeran Walangsungsang. Ia memeluk Islam, menunaikan ibadah haji, dan menikah dengan Syarif Abdullah dari Mesir. Ia adalah ibu Sunan Gunung Jati."
    },
    nyaiSubangLarang: {
        title: "Nyai Subang Larang",
        description: "Istri Prabu Siliwangi dan ibu Pangeran Walangsungsang, Nyai Rara Santang, dan Raden Kian Santang. Ia memeluk Islam dan memengaruhi anak-anaknya untuk mempelajari agama Islam, menjadi dasar berdirinya Kesultanan Cirebon."
    }
};

function openModal(figure) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    document.body.classList.add('modal-open');

    modalTitle.textContent = figureDetails[figure].title;
    modalDescription.textContent = figureDetails[figure].description;
    modal.style.display = 'flex';
}

function closeModal(event) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    if (event.target === modal || event.target === document.querySelector('.modal-close')) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}