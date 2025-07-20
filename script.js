// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.add('fade-in');
        
        // Animate skill bars if on skills page
        if (pageId === 'skills') {
            setTimeout(() => {
                animateSkillBars();
            }, 300);
        }
    }
    
    // Update navbar active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Close mobile menu if open
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Profile image upload
function uploadProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('profileImage');
            img.src = e.target.result;
            img.style.animation = 'fadeIn 0.5s ease-in-out';
        };
        reader.readAsDataURL(file);
        
        // Show loading feedback
        showLoadingSpinner(event.target.parentElement);
    }
}

// Add new certification
function addCertification() {
    const name = document.getElementById('certName').value.trim();
    const description = document.getElementById('certDescription').value.trim();
    const fileInput = document.getElementById('certUpload');
    
    if (!name || !description) {
        alert('Please fill in both name and description fields.');
        return;
    }
    
    // Create new certification card
    const certContainer = document.getElementById('certificationsContainer');
    const newCert = document.createElement('div');
    newCert.className = 'col-lg-4 col-md-6 mb-4';
    
    newCert.innerHTML = `
        <div class="certification-card">
            <div class="cert-icon">
                <i class="fas fa-certificate"></i>
            </div>
            <h5>${name}</h5>
            <p>${description}</p>
            <span class="cert-badge">New</span>
            ${fileInput.files[0] ? '<div class="mt-2"><small class="text-muted">Document uploaded</small></div>' : ''}
        </div>
    `;
    
    certContainer.appendChild(newCert);
    
    // Clear form
    document.getElementById('certName').value = '';
    document.getElementById('certDescription').value = '';
    document.getElementById('certUpload').value = '';
    
    // Add animation
    newCert.classList.add('fade-in');
    
    alert('Certification added successfully!');
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Clear form
            contactForm.reset();
        });
    }
});

// Smooth scrolling and navbar effects
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add initial animations
    setTimeout(() => {
        const heroTitle = document.querySelector('#home .display-3');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // Initialize skill bars animation
    const skillsPage = document.getElementById('skills');
    if (skillsPage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        });
        
        observer.observe(skillsPage);
    }
});

// Add particle effect to hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        heroSection.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const pages = ['home', 'profile', 'skills', 'certifications', 'achievements', 'contact'];
    const currentPage = document.querySelector('.page.active').id;
    const currentIndex = pages.indexOf(currentPage);
    
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }
});

// Add loading spinner for file uploads
function showLoadingSpinner(element) {
    const spinner = document.createElement('div');
    spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    spinner.className = 'text-center mt-2';
    element.appendChild(spinner);
    
    setTimeout(() => {
        spinner.remove();
    }, 2000);
}

// Add smooth page transitions
function smoothTransition(pageId) {
    const currentPage = document.querySelector('.page.active');
    
    // Fade out current page
    currentPage.style.opacity = '0';
    currentPage.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
        showPage(pageId);
        
        // Fade in new page
        const newPage = document.querySelector('.page.active');
        newPage.style.opacity = '1';
        newPage.style.transform = 'translateX(0)';
    }, 300);
}

// Add interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to cards
    const cards = document.querySelectorAll('.certification-card, .achievement-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});