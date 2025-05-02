// main.js - Core JavaScript functionality

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements
    initAnimations();
    
    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize hover effects for special elements
    initHoverEffects();
    
    // Initialize dark mode functionality
    initThemeToggle();
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
    
    // Add animations to category cards with delay
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length > 0) {
        categoryCards.forEach((card, index) => {
            card.style.opacity = '0';
            setTimeout(() => {
                card.classList.add('slide-up');
                // Add a subtle pulse to the icon
                const icon = card.querySelector('.category-icon');
                if (icon) {
                    icon.classList.add('pulse');
                }
            }, 200 * index);
        });
    }
    
    // Add animations to table rows
    const tableRows = document.querySelectorAll('.table-row');
    if (tableRows.length > 0) {
        tableRows.forEach((row, index) => {
            row.style.opacity = '0';
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 100 * index);
        });
    }
    
    // Add float animation to specific elements
    const floatElements = document.querySelectorAll('.testimonial-card, .lead-card');
    if (floatElements.length > 0) {
        floatElements.forEach((el) => {
            el.classList.add('float');
        });
    }
}

// Function to initialize hover effects
function initHoverEffects() {
    // Add hover effects to subcategory badges with link behavior
    const subcategoryBadgeLinks = document.querySelectorAll('.subcategory-badge-link');
    if (subcategoryBadgeLinks.length > 0) {
        subcategoryBadgeLinks.forEach((link) => {
            const badge = link.querySelector('.subcategory-badge');
            
            link.addEventListener('mouseenter', function() {
                if (badge) {
                    badge.style.transform = 'scale(1.1)';
                    badge.style.backgroundColor = '#0056b3';
                    badge.style.color = 'white';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (badge) {
                    badge.style.transform = 'scale(1)';
                    badge.style.backgroundColor = '';
                    badge.style.color = '';
                }
            });
            
            // Add click animation
            link.addEventListener('click', function() {
                if (badge) {
                    badge.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        badge.style.transform = 'scale(1.1)';
                    }, 100);
                }
            });
        });
    }
    
    // Add hover and click effects to view sheet button
    const viewSheetBtns = document.querySelectorAll('.view-sheet-btn');
    if (viewSheetBtns.length > 0) {
        viewSheetBtns.forEach((btn) => {
            const icon = btn.querySelector('i');
            
            btn.addEventListener('mouseenter', function() {
                if (icon) {
                    icon.style.transform = 'translateX(3px)';
                }
            });
            
            btn.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.transform = 'translateX(0)';
                }
            });
            
            // Add click animation
            btn.addEventListener('click', function() {
                this.style.transform = 'translateY(2px)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px)';
                }, 100);
            });
        });
    }
    
    // Add hover effects to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length > 0) {
        categoryCards.forEach((card) => {
            card.addEventListener('mouseenter', function() {
                // Add subtle rotation to the icon within the card
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.2)';
                }
            });
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
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
