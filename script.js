// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.classList.add('hidden');
});

// Toggle icon navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll sections active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky navbar
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    navbar.classList.remove('active');
};

// Typed JS for multiple text
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Creative Designer', 'UI/UX Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Scroll reveal animation
const sr = ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

sr.reveal('.home-content, .heading', { origin: 'top' });
sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
sr.reveal('.home-content h1, .about-img', { origin: 'left' });
sr.reveal('.home-content p, .about-content', { origin: 'right' });


// Skill bar animation
const skillSection = document.querySelector('.about');
const skillBars = document.querySelectorAll('.skill-per');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(skill => {
                skill.style.width = skill.getAttribute('per');
            });
        } else {
            skillBars.forEach(skill => {
                skill.style.width = '0';
            });
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    skillObserver.observe(skillSection);
}

// Custom Alert Logic
const customAlert = document.getElementById('customAlert');
const alertMessage = document.getElementById('alertMessage');
const alertIcon = document.getElementById('alertIcon');
const closeAlertBtn = document.getElementById('closeAlertBtn');

function showCustomAlert(message, isSuccess) {
    alertMessage.textContent = message;
    const alertBox = customAlert.querySelector('.custom-alert-box');
    
    if (isSuccess) {
        alertIcon.className = 'fa-solid fa-circle-check';
        alertBox.classList.add('success');
    } else {
        alertIcon.className = 'fa-solid fa-circle-xmark';
        alertBox.classList.remove('success');
    }
    customAlert.classList.add('active');
}

closeAlertBtn.addEventListener('click', () => {
    customAlert.classList.remove('active');
});

// Contact form submission via AJAX
const contactForm = document.querySelector('.contact form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = contactForm.querySelector('input[name="Email_Pengirim"]');
        const phoneInput = contactForm.querySelector('input[name="Nomor_HP"]');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showCustomAlert('Format email salah. Silakan gunakan format yang benar (contoh@email.com)!', false);
            return;
        }

        if (phoneInput.value.trim() !== '') {
            if (phoneInput.value.length < 10 || phoneInput.value.length > 14) {
                showCustomAlert('Nomor telepon tidak valid! Harap masukkan 10-14 digit angka.', false);
                return;
            }
        }

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalBtnText = submitBtn.value;
        
        submitBtn.value = 'Sending...';

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showCustomAlert('Pesan Anda berhasil dikirim! Terima kasih.', true);
                contactForm.reset();
            } else {
                showCustomAlert('Terjadi kesalahan, pesan gagal dikirim.', false);
            }
            submitBtn.value = originalBtnText;
        })
        .catch(error => {
            showCustomAlert('Terjadi kesalahan jaringan. Silakan coba lagi.', false);
            submitBtn.value = originalBtnText;
        });
    });
}
