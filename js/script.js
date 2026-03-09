/* ============================================================================
   SATHWIKA KALLEDA - BI & DATA ANALYST PORTFOLIO
   JavaScript File
   ============================================================================ */

// ============================================================================
// 1. NAVIGATION
// ============================================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================================================
// 2. SMOOTH SCROLLING
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') { e.preventDefault(); return; }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================================
// 3. SCROLL TO TOP BUTTON
// ============================================================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================================
// 4. CONTACT FORM HANDLING
// ============================================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:sathwikareddy51@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client will open to send the message.');
    
    // Reset form
    contactForm.reset();
});

// ============================================================================
// 5. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .process-step, .cert-card'
);

animateElements.forEach(el => observer.observe(el));

// ============================================================================
// 6. ACTIVE NAV LINK HIGHLIGHTING
// ============================================================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================================================
// 7. TYPING ANIMATION (OPTIONAL)
// ============================================================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing animation on hero title
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 100);
// }

// ============================================================================
// 8. LAZY LOADING IMAGES
// ============================================================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================================================
// 9. PREVENT FLASH OF UNSTYLED CONTENT
// ============================================================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================================================
// 10. KEYBOARD NAVIGATION ACCESSIBILITY
// ============================================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        // Close any open modal
        document.querySelectorAll('.insights-modal.open').forEach(modal => closeModal(modal));
    }
});

// ============================================================================
// 11. DETECT BROWSER & ADD CLASS
// ============================================================================
const userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1) {
    document.body.classList.add('safari');
} else if (userAgent.indexOf('firefox') !== -1) {
    document.body.classList.add('firefox');
} else if (userAgent.indexOf('chrome') !== -1) {
    document.body.classList.add('chrome');
}

// ============================================================================
// 12. CONSOLE MESSAGE
// ============================================================================
console.log('%cSathwika Kalleda Portfolio', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBI & Data Analyst | Dubai, UAE', 'font-size: 14px; color: #64748b;');
console.log('%cInterested in collaboration? Email: sathwikareddy51@gmail.com', 'font-size: 12px; color: #10b981;');

// ============================================================================
// 13. PERFORMANCE MONITORING (OPTIONAL)
// ============================================================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// ============================================================================
// 14. PROJECT CARD CAROUSELS
// ============================================================================
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let current = 0;
    let autoTimer = null;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); resetAuto(); }));

    // Touch / swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        resetAuto();
    });

    function startAuto() {
        autoTimer = setInterval(() => goTo(current + 1), 3500);
    }
    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }
    startAuto();
});

// ============================================================================
// 15. PROJECT INSIGHTS MODALS
// ============================================================================
document.querySelectorAll('.insights-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');
        const modal = document.getElementById('modal-' + projectId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                const closeBtn = modal.querySelector('.modal-close');
                if (closeBtn) closeBtn.focus();
            }, 100);
        }
    });
});

function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal(btn.closest('.insights-modal'));
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => closeModal(overlay.closest('.insights-modal')));
});
