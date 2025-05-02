// main.js - Core JavaScript functionality

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements
    initAnimations();
    
    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize form validation
    initFormValidation();
});

// Function to initialize animations
function initAnimations() {
    // Add fade-in animation to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('fade-in');
    }
    
    // Add slide-up animation to feature boxes with delay
    const featureBoxes = document.querySelectorAll('.feature-box');
    if (featureBoxes.length > 0) {
        featureBoxes.forEach((box, index) => {
            box.style.opacity = '0';
            setTimeout(() => {
                box.classList.add('slide-up');
            }, 200 * index);
        });
    }
    
    // Add slide-up animation to service cards with delay
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            setTimeout(() => {
                card.classList.add('slide-up');
            }, 200 * index);
        });
    }
}

// Function to handle navbar scroll behavior
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'shadow-sm');
                navbar.classList.remove('navbar-dark');
                navbar.classList.add('navbar-light');
            } else {
                navbar.classList.remove('bg-white', 'shadow-sm');
                if (navbar.classList.contains('navbar-on-dark')) {
                    navbar.classList.add('navbar-dark');
                    navbar.classList.remove('navbar-light');
                }
            }
        });
    }
}

// Function to initialize form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            contactForm.classList.add('was-validated');
        });
    }
}

// Function to show/hide the back to top button
window.onscroll = function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = 'block';
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
            }, 100);
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                backToTopBtn.style.display = 'none';
            }, 300);
        }
    }
};

// Function to scroll back to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
