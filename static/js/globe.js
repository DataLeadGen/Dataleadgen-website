document.addEventListener('DOMContentLoaded', function() {
    console.log('Globe.js loaded and running');
    
    // Get the globe container
    const globeContainer = document.getElementById('globe-container');
    
    if (globeContainer) {
        console.log('Globe container found');
        
        // Set a background color for the container
        globeContainer.style.backgroundColor = 'var(--light-blue)';
    } else {
        console.error('Globe container not found! Check if the element with ID "globe-container" exists in the HTML.');
        return;
        // Create the image element for the network globe
        const globeImage = document.createElement('img');
        // Use a direct image URL without query parameters
        globeImage.src = 'https://img.freepik.com/free-vector/flat-social-media-background-with-variety-icons_23-2147819017.jpg';
        globeImage.alt = 'Network Globe Visualization';
        globeImage.className = 'globe-image';
        
        // Add error handling for the image
        globeImage.onerror = function() {
            console.error('Failed to load globe image');
            // Fallback to a solid color background
            globeContainer.style.backgroundColor = 'var(--primary-color)';
            globeContainer.style.opacity = '0.2';
            
            // Hide loading spinner
            const loadingElement = globeContainer.querySelector('.globe-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        };
        
        // Create overlay elements for enhanced visual effect
        const createOverlayElement = (className) => {
            const element = document.createElement('div');
            element.className = className;
            return element;
        };
        
        // Social media icons to be displayed
        const socialIcons = [
            { icon: 'fab fa-linkedin', color: '#0077B5', size: 20, bgColor: 'rgba(0, 119, 181, 0.2)' },
            { icon: 'fab fa-facebook', color: '#1877F2', size: 18, bgColor: 'rgba(24, 119, 242, 0.2)' },
            { icon: 'fab fa-twitter', color: '#1DA1F2', size: 16, bgColor: 'rgba(29, 161, 242, 0.2)' },
            { icon: 'fab fa-instagram', color: '#E4405F', size: 22, bgColor: 'rgba(228, 64, 95, 0.2)' },
            { icon: 'fab fa-youtube', color: '#FF0000', size: 19, bgColor: 'rgba(255, 0, 0, 0.2)' },
            { icon: 'fab fa-pinterest', color: '#BD081C', size: 17, bgColor: 'rgba(189, 8, 28, 0.2)' },
            { icon: 'fab fa-tiktok', color: '#000000', size: 18, bgColor: 'rgba(0, 0, 0, 0.2)' },
            { icon: 'fab fa-snapchat', color: '#FFFC00', size: 20, bgColor: 'rgba(255, 252, 0, 0.2)' },
            { icon: 'fab fa-whatsapp', color: '#25D366', size: 21, bgColor: 'rgba(37, 211, 102, 0.2)' },
            { icon: 'fab fa-telegram', color: '#0088cc', size: 19, bgColor: 'rgba(0, 136, 204, 0.2)' },
            { icon: 'fab fa-slack', color: '#4A154B', size: 18, bgColor: 'rgba(74, 21, 75, 0.2)' },
            { icon: 'fab fa-discord', color: '#7289DA', size: 17, bgColor: 'rgba(114, 137, 218, 0.2)' }
        ];
        
        // Create nodes (connection points) on the globe
        const nodes = [];
        for (let i = 0; i < 12; i++) {
            const node = createOverlayElement('globe-node');
            // Distribute nodes across the globe
            const angle = (i / 12) * 2 * Math.PI;
            const radius = 35 + Math.random() * 10; // Vary the distance from center
            
            // Calculate position based on angle and radius
            const centerX = 50;
            const centerY = 50;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            node.style.top = `${y}%`;
            node.style.left = `${x}%`;
            node.style.width = `${Math.random() * 4 + 4}px`;
            node.style.height = node.style.width;
            node.style.animationDelay = `${Math.random() * 3}s`;
            node.dataset.x = x;
            node.dataset.y = y;
            nodes.push(node);
        }
        
        // Create social media icons that orbit around nodes
        const socialElements = [];
        nodes.forEach((node, nodeIndex) => {
            // Each node gets 1-2 social icons
            const numIcons = Math.floor(Math.random() * 2) + 1;
            
            for (let i = 0; i < numIcons; i++) {
                const socialIconIndex = (nodeIndex + i) % socialIcons.length;
                const socialData = socialIcons[socialIconIndex];
                // Store the social icon index for later reference
                socialElement.dataset.socialIconIndex = socialIconIndex;
                
                const socialElement = createOverlayElement('globe-social-icon');
                const icon = document.createElement('i');
                icon.className = socialData.icon;
                socialElement.appendChild(icon);
                
                // Style the social icon
                socialElement.style.color = socialData.color;
                socialElement.style.fontSize = `${socialData.size}px`;
                socialElement.style.width = `${socialData.size * 2}px`;
                socialElement.style.height = `${socialData.size * 2}px`;
                socialElement.style.backgroundColor = socialData.bgColor || 'rgba(255, 255, 255, 0.9)';
                socialElement.style.boxShadow = `0 0 10px ${socialData.color}80`; // Add color-specific glow
                
                // Set animation properties
                const orbitRadius = 25 + Math.random() * 15;
                const orbitSpeed = 10 + Math.random() * 20;
                const orbitDelay = Math.random() * 10;
                const nodeX = parseFloat(node.dataset.x);
                const nodeY = parseFloat(node.dataset.y);
                
                socialElement.dataset.nodeX = nodeX;
                socialElement.dataset.nodeY = nodeY;
                socialElement.dataset.orbitRadius = orbitRadius;
                socialElement.dataset.orbitSpeed = orbitSpeed;
                socialElement.dataset.orbitDelay = orbitDelay;
                socialElement.dataset.startAngle = Math.random() * 2 * Math.PI;
                
                socialElements.push(socialElement);
            }
        });
        
        // Add decorative particles
        const particles = [];
        for (let i = 0; i < 8; i++) {
            const particle = createOverlayElement('globe-particle');
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particles.push(particle);
        }
        
        // Create connection lines between nodes and social icons
        const connections = [];
        socialElements.forEach(socialElement => {
            const connection = createOverlayElement('globe-connection');
            connection.dataset.socialId = socialElements.indexOf(socialElement);
            connections.push(connection);
        });
        
        // Remove loading spinner once image is loaded
        globeImage.onload = function() {
            const loadingElement = globeContainer.querySelector('.globe-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            // Add nodes to the container
            nodes.forEach(node => {
                globeContainer.appendChild(node);
            });
            
            // Add connections to the container
            connections.forEach(connection => {
                globeContainer.appendChild(connection);
            });
            
            // Add social icons to the container
            socialElements.forEach(socialElement => {
                globeContainer.appendChild(socialElement);
            });
            
            // Add particles after image is loaded
            particles.forEach(particle => {
                globeContainer.appendChild(particle);
            });
            
            // Start the animation for social icons orbiting around nodes
            animateSocialIcons();
            
            // Add a subtle pulse animation to the globe
            setTimeout(() => {
                globeImage.style.animation = 'rotate 120s linear infinite';
            }, 500);
        };
        
        // Add the image to the container
        globeContainer.appendChild(globeImage);
        
        // Function to animate social icons orbiting around nodes
        function animateSocialIcons() {
            // Update position of each social icon
            socialElements.forEach((socialElement, index) => {
                const nodeX = parseFloat(socialElement.dataset.nodeX);
                const nodeY = parseFloat(socialElement.dataset.nodeY);
                const orbitRadius = parseFloat(socialElement.dataset.orbitRadius);
                const orbitSpeed = parseFloat(socialElement.dataset.orbitSpeed);
                const orbitDelay = parseFloat(socialElement.dataset.orbitDelay);
                const startAngle = parseFloat(socialElement.dataset.startAngle);
                
                // Calculate current angle based on time
                const time = (Date.now() / 1000) - orbitDelay;
                const angle = startAngle + (time / orbitSpeed) * 2 * Math.PI;
                
                // Calculate position based on orbit
                const x = nodeX + orbitRadius * Math.cos(angle) / 5;
                const y = nodeY + orbitRadius * Math.sin(angle) / 8;
                
                // Update social icon position
                socialElement.style.top = `${y}%`;
                socialElement.style.left = `${x}%`;
                
                // Add a subtle pulsing effect to the icons
                const pulseScale = 1 + 0.1 * Math.sin(time * 2 + index);
                socialElement.style.transform = `scale(${pulseScale}) rotate(${Math.sin(time) * 10}deg)`;
                
                // Update connection line
                const connection = connections[index];
                if (connection) {
                    // Calculate positions in pixels for more accurate line drawing
                    const containerRect = globeContainer.getBoundingClientRect();
                    const nodeXPx = (nodeX / 100) * containerRect.width;
                    const nodeYPx = (nodeY / 100) * containerRect.height;
                    const socialXPx = (x / 100) * containerRect.width;
                    const socialYPx = (y / 100) * containerRect.height;
                    
                    // Calculate angle and length for the line
                    const deltaX = socialXPx - nodeXPx;
                    const deltaY = socialYPx - nodeYPx;
                    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    const angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                    
                    // Position and rotate the line
                    connection.style.top = `${nodeY}%`;
                    connection.style.left = `${nodeX}%`;
                    connection.style.width = `${length / containerRect.width * 100}%`;
                    connection.style.transformOrigin = 'left center';
                    connection.style.transform = `rotate(${angleDeg}deg)`;
                    
                    // Pulse effect for the connection
                    const pulseOpacity = 0.3 + 0.2 * Math.sin(time * 2);
                    connection.style.opacity = pulseOpacity;
                    
                    // Add color based on the social icon
                    const socialIconIndex = parseInt(socialElement.dataset.socialIconIndex);
                    const socialData = socialIcons[socialIconIndex];
                    connection.style.background = `linear-gradient(to right, 
                        rgba(255, 255, 255, 0.1), 
                        ${socialData.color}80 50%, 
                        rgba(255, 255, 255, 0.1)
                    )`;
                    
                    // Add a subtle animation to the line thickness
                    const pulseThickness = 1 + 0.5 * Math.sin(time * 3);
                    connection.style.height = `${pulseThickness}px`;
                }
            });
            
            // Continue animation
            requestAnimationFrame(animateSocialIcons);
        }
        
        // Add interactive hover effect with smooth transitions
        let animationFrameId;
        let currentRotation = 0;
        let targetRotation = 0;
        let scale = 1;
        let targetScale = 1;
        let rotateX = 0;
        let targetRotateX = 0;
        let rotateY = 0;
        let targetRotateY = 0;
        
        const updateTransform = () => {
            // Smoothly interpolate between current and target values
            currentRotation += (targetRotation - currentRotation) * 0.1;
            scale += (targetScale - scale) * 0.1;
            rotateX += (targetRotateX - rotateX) * 0.1;
            rotateY += (targetRotateY - rotateY) * 0.1;
            
            // Apply the transform
            globeImage.style.transform = `
                rotate(${currentRotation}deg) 
                scale(${scale}) 
                perspective(1000px) 
                rotateY(${rotateY}deg) 
                rotateX(${rotateX}deg)
            `;
            
            animationFrameId = requestAnimationFrame(updateTransform);
        };
        
        // Start the animation loop
        updateTransform();
        
        // Update rotation continuously but very slowly
        setInterval(() => {
            targetRotation += 0.05;
        }, 16);
        
        // Add interactive hover effect
        globeContainer.addEventListener('mousemove', function(e) {
            const rect = globeContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate the center of the container
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate the distance from the center (normalized)
            const distX = (x - centerX) / centerX;
            const distY = (y - centerY) / centerY;
            
            // Update target values for smooth animation
            targetScale = 1.05;
            targetRotateY = distX * 10;
            targetRotateX = -distY * 10;
            
            // Add a subtle glow effect on hover
            globeContainer.style.boxShadow = `0 15px 40px rgba(0, 86, 179, 0.3), 0 0 20px rgba(0, 86, 179, 0.2) inset`;
        });
        
        // Reset transform when mouse leaves
        globeContainer.addEventListener('mouseleave', function() {
            targetScale = 1;
            targetRotateX = 0;
            targetRotateY = 0;
            
            // Reset the glow effect
            globeContainer.style.boxShadow = '';
        });
        
        // Add CSS for all the elements
        const style = document.createElement('style');
        style.textContent = `
            .globe-particle {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                z-index: 3;
                pointer-events: none;
                animation: float-particle 15s ease-in-out infinite;
            }
            
            .globe-node {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                z-index: 4;
                pointer-events: none;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                animation: pulse-node 3s ease-in-out infinite;
            }
            
            .globe-social-icon {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                z-index: 5;
                pointer-events: none;
                box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }
            
            .globe-social-icon:hover {
                transform: scale(1.2);
            }
            
            .globe-connection {
                position: absolute;
                height: 1px;
                background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.8));
                z-index: 2;
                pointer-events: none;
            }
            
            @keyframes float-particle {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                25% {
                    transform: translate(20px, -30px);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(40px, 0);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(20px, 30px);
                    opacity: 0.8;
                }
            }
            
            @keyframes pulse-node {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.7;
                }
                50% {
                    transform: scale(1.5);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
});