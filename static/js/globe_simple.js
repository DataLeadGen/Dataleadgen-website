document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple globe script loaded');
    
    // Get the globe container
    const globeContainer = document.getElementById('globe-container');
    
    if (!globeContainer) {
        console.error('Globe container not found!');
        return;
    }
    
    // Set background color
    globeContainer.style.backgroundColor = '#041E42';
    
    // Create and add the globe image
    const globeImg = document.createElement('img');
    globeImg.src = 'https://cdn.pixabay.com/photo/2017/03/23/09/34/artificial-intelligence-2167835_1280.jpg';
    globeImg.alt = 'Network Globe';
    globeImg.className = 'globe-image';
    globeImg.style.width = '100%';
    globeImg.style.height = '100%';
    globeImg.style.objectFit = 'cover';
    globeImg.style.borderRadius = '10px';
    globeImg.style.opacity = '0.8';
    
    // Add a slow rotation animation
    globeImg.style.animation = 'rotate 60s linear infinite';
    
    // Add the image to the container
    globeContainer.appendChild(globeImg);
    
    // Hide the loading spinner
    const loadingElement = globeContainer.querySelector('.globe-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    // Add some social media icons that float over the globe
    const socialIcons = [
        { icon: 'fab fa-linkedin', color: '#0077B5' },
        { icon: 'fab fa-facebook', color: '#1877F2' },
        { icon: 'fab fa-twitter', color: '#1DA1F2' },
        { icon: 'fab fa-instagram', color: '#E4405F' },
        { icon: 'fab fa-youtube', color: '#FF0000' },
        { icon: 'fab fa-pinterest', color: '#BD081C' }
    ];
    
    // Create and add social icons
    socialIcons.forEach((social, index) => {
        const iconElement = document.createElement('div');
        iconElement.className = 'social-icon';
        
        // Position randomly on the globe
        const top = 20 + Math.random() * 60; // Between 20% and 80%
        const left = 20 + Math.random() * 60; // Between 20% and 80%
        
        // Style the icon
        iconElement.style.position = 'absolute';
        iconElement.style.top = `${top}%`;
        iconElement.style.left = `${left}%`;
        iconElement.style.width = '40px';
        iconElement.style.height = '40px';
        iconElement.style.backgroundColor = 'white';
        iconElement.style.borderRadius = '50%';
        iconElement.style.display = 'flex';
        iconElement.style.alignItems = 'center';
        iconElement.style.justifyContent = 'center';
        iconElement.style.boxShadow = `0 0 15px ${social.color}`;
        iconElement.style.zIndex = '10';
        
        // Add a floating animation
        iconElement.style.animation = `float ${5 + index}s ease-in-out infinite`;
        iconElement.style.animationDelay = `${index * 0.5}s`;
        
        // Create the icon
        const i = document.createElement('i');
        i.className = social.icon;
        i.style.fontSize = '20px';
        i.style.color = social.color;
        
        // Add the icon to the element
        iconElement.appendChild(i);
        
        // Add the element to the container
        globeContainer.appendChild(iconElement);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);
});