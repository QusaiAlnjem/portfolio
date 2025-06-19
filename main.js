// Helper: Get current language from nav or localStorage
function getCurrentLanguage() {
    // Try localStorage first
    const storedLang = localStorage.getItem('selectedLang');
    if (storedLang) return storedLang;
    // Fallback to nav
    const activeLang = document.querySelector('.lang-option.active');
    if (activeLang) return activeLang.getAttribute('data-lang');
    return 'en';
}

// When switching language, save to localStorage
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', function () {
        document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        const lang = this.getAttribute('data-lang');
        localStorage.setItem('selectedLang', lang); // Save selection
        setLanguage(lang);
    });
});

// On page load, use saved language if available
document.addEventListener('DOMContentLoaded', function () {
    let lang = getCurrentLanguage();
    setLanguage(lang);
    // Set active class on correct lang-option
    document.querySelectorAll('.lang-option').forEach(opt => {
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });
});

const workBtn = document.getElementById('workGalleryBtn');
if (workBtn) {
    workBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = getCurrentLanguage();
        window.location.href = `workgallery-page/work-gallery.html?lang=${lang}`;
    });
}
// Helper function to fetch and apply translations
function setLanguage(lang) {
    fetch(`languages/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key];
                } else {
                    el.textContent = translations[key];
                }
            }
        });

        // Set direction and language attributes for Arabic
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
        }
    });
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add interactive hover effects to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px) scale(1)';
        }, 150);
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});
