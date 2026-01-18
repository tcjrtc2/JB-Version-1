// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.textContent = '☰';
        });
    });
}

// Parallax Effect with RequestAnimationFrame
let lastScrollY = window.pageYOffset;
let parallaxTicking = false;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const layers = document.querySelectorAll('.bg-layer');
            
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.15;
                layer.style.transform = `translate3d(0, ${-(lastScrollY * speed)}px, 0)`;
            });
            
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Wishlist Toggle with Animation
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        this.textContent = this.classList.contains('active') ? '❤' : '♡';
        
        // Trigger animation by briefly removing and re-adding class
        if (this.classList.contains('active')) {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        }
    });
});

// Product Card 3D Tilt Effect with Enhanced Animation
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        requestAnimationFrame(() => {
            card.style.transform = `
                perspective(1000px)
                translateY(-15px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.03)
            `;
            card.style.transition = 'box-shadow 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            const btn = newsletterForm.querySelector('.btn-primary');
            const originalText = btn.textContent;
            
            btn.textContent = '✓ Subscribed!';
            btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            newsletterForm.querySelector('input').value = '';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
}

// Scroll Reveal Animation with Stagger Effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
        }
    });
}, observerOptions);

// Observe all cards and sections with initial hidden state
document.querySelectorAll('.product-card, .testimonial-card, .feature, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// Instagram Post Hover Effect
document.querySelectorAll('.instagram-post').forEach(post => {
    post.addEventListener('click', () => {
        console.log('Instagram post clicked - add your link here');
    });
});

// Scroll Progress Indicator with Optimized Performance
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(scrollProgress);

const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(201, 169, 110, 0.15);
        z-index: 9999;
    }
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #c9a96e 0%, #d4b896 100%);
        width: 0%;
        transition: width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 2px 10px rgba(201, 169, 110, 0.5);
    }
`;
document.head.appendChild(style);

const progressBar = document.querySelector('.scroll-progress-bar');
let progressTicking = false;

window.addEventListener('scroll', () => {
    if (!progressTicking) {
        window.requestAnimationFrame(() => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
            progressTicking = false;
        });
        progressTicking = true;
    }
});

console.log('✨ Jazzy\'s Boutique - Website Loaded Successfully!');
