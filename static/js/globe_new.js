document.addEventListener('DOMContentLoaded', function() {
    console.log('Globe script loaded');
    
    // Get the globe container
    const globeContainer = document.getElementById('globe-container');
    
    if (!globeContainer) {
        console.error('Globe container not found!');
        return;
    }
    
    // Create the image element for the network globe
    const globeImage = document.createElement('img');
    // Use a direct image URL that's more likely to work
    globeImage.src = 'https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_1280.jpg';
    globeImage.alt = 'Network Globe Visualization';
    globeImage.className = 'globe-image';
    
    // Remove loading spinner once image is loaded
    globeImage.onload = function() {
        console.log('Globe image loaded successfully');
        const loadingElement = globeContainer.querySelector('.globe-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        // Add nodes and social icons after image is loaded
        addNodesAndIcons();
    };
    
    // Error handling for the image
    globeImage.onerror = function() {
        console.error('Failed to load globe image');
        // Try with a different URL as fallback
        globeImage.src = 'https://cdn.pixabay.com/photo/2017/11/12/13/37/network-2942630_1280.jpg';
        
        // If the fallback also fails, use a solid color background
        globeImage.onerror = function() {
            console.error('Fallback image also failed to load');
            globeContainer.style.backgroundColor = 'var(--primary-color)';
            globeContainer.style.opacity = '0.5';
            
            // Hide loading spinner
            const loadingElement = globeContainer.querySelector('.globe-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            // Still add nodes and icons
            addNodesAndIcons();
        };
    };
    
    // Add the image to the container
    globeContainer.appendChild(globeImage);
    
    // Function to add nodes and social icons
    function addNodesAndIcons() {
        // Add nodes (connection points)
        for (let i = 0; i < 8; i++) {
            const node = document.createElement('div');
            node.className = 'globe-node';
            
            // Position nodes randomly on the globe
            node.style.position = 'absolute';
            node.style.top = `${20 + Math.random() * 60}%`;
            node.style.left = `${20 + Math.random() * 60}%`;
            node.style.width = '8px';
            node.style.height = '8px';
            node.style.backgroundColor = '#ffffff';
            node.style.borderRadius = '50%';
            node.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
            node.style.zIndex = '4';
            
            // Add animation
            node.style.animation = 'pulse-node 3s ease-in-out infinite';
            
            globeContainer.appendChild(node);
        }
        
        // Add social media icons
        const socialIcons = [
            { icon: 'fab fa-linkedin', color: '#0077B5' },
            { icon: 'fab fa-facebook', color: '#1877F2' },
            { icon: 'fab fa-twitter', color: '#1DA1F2' },
            { icon: 'fab fa-instagram', color: '#E4405F' },
            { icon: 'fab fa-youtube', color: '#FF0000' },
            { icon: 'fab fa-pinterest', color: '#BD081C' },
            { icon: 'fab fa-tiktok', color: '#000000' },
            { icon: 'fab fa-snapchat', color: '#FFFC00' }
        ];
        
        // Create orbits for social icons
        socialIcons.forEach((social, index) => {
            // Create orbit path
            const orbit = document.createElement('div');
            orbit.className = 'globe-orbit';
            orbit.style.position = 'absolute';
            orbit.style.top = '50%';
            orbit.style.left = '50%';
            orbit.style.width = `${100 + index * 20}px`;
            orbit.style.height = `${100 + index * 20}px`;
            orbit.style.transform = 'translate(-50%, -50%)';
            orbit.style.borderRadius = '50%';
            orbit.style.border = '1px dashed rgba(255, 255, 255, 0.2)';
            orbit.style.zIndex = '3';
            
            // Create the icon element
            const icon = document.createElement('div');
            icon.className = 'globe-social-icon';
            
            // Style the container
            icon.style.position = 'absolute';
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            icon.style.width = '40px';
            icon.style.height = '40px';
            icon.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            icon.style.borderRadius = '50%';
            icon.style.boxShadow = `0 0 10px ${social.color}80`;
            icon.style.zIndex = '5';
            
            // Position at top of orbit initially
            icon.style.top = '-20px';
            icon.style.left = '50%';
            icon.style.marginLeft = '-20px';
            
            // Add animation - rotate around the orbit
            icon.style.animation = `rotate-around ${8 + index * 2}s linear infinite`;
            
            // Create the icon element
            const i = document.createElement('i');
            i.className = social.icon;
            i.style.color = social.color;
            i.style.fontSize = '20px';
            
            icon.appendChild(i);
            orbit.appendChild(icon);
            globeContainer.appendChild(orbit);
        });
        
        // Add animation for orbiting
        const orbitStyle = document.createElement('style');
        orbitStyle.textContent = `
            @keyframes rotate-around {
                0% { transform: rotate(0deg) translateY(-50%) rotate(0deg); }
                100% { transform: rotate(360deg) translateY(-50%) rotate(-360deg); }
            }
        `;
        document.head.appendChild(orbitStyle);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-node {
                0%, 100% { transform: scale(1); opacity: 0.7; }
                50% { transform: scale(1.5); opacity: 1; }
            }
            
            @keyframes rotate-icon {
                0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
            }
            
            .globe-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: relative;
                animation: rotate 60s linear infinite;
                transform-origin: center center;
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});