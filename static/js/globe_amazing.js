document.addEventListener('DOMContentLoaded', function() {
    console.log('Amazing globe visualization loading...');
    
    // Get the globe container
    const globeContainer = document.getElementById('globe-container');
    
    if (!globeContainer) {
        console.error('Globe container not found!');
        return;
    }
    
    // Set initial container styling
    globeContainer.style.backgroundColor = '#041E42';
    globeContainer.style.overflow = 'hidden';
    
    // Create the globe background
    const globeBackground = document.createElement('div');
    globeBackground.className = 'globe-background';
    globeBackground.style.position = 'absolute';
    globeBackground.style.top = '0';
    globeBackground.style.left = '0';
    globeBackground.style.width = '100%';
    globeBackground.style.height = '100%';
    globeBackground.style.background = 'radial-gradient(circle at center, #0A4D8C 0%, #041E42 100%)';
    globeBackground.style.opacity = '1';
    globeBackground.style.zIndex = '1';
    globeContainer.appendChild(globeBackground);
    
    // Create the globe sphere
    const globeSphere = document.createElement('div');
    globeSphere.className = 'globe-sphere';
    globeSphere.style.position = 'absolute';
    globeSphere.style.top = '50%';
    globeSphere.style.left = '50%';
    globeSphere.style.width = '220px';
    globeSphere.style.height = '220px';
    globeSphere.style.marginTop = '-110px';
    globeSphere.style.marginLeft = '-110px';
    globeSphere.style.borderRadius = '50%';
    globeSphere.style.background = 'radial-gradient(circle at 30% 30%, #1A8FE3 0%, #0A4D8C 60%, #041E42 100%)';
    globeSphere.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(0, 149, 255, 0.4)';
    globeSphere.style.zIndex = '2';
    globeSphere.style.animation = 'rotate-globe 120s linear infinite';
    globeContainer.appendChild(globeSphere);
    
    // Create the globe grid
    const globeGrid = document.createElement('div');
    globeGrid.className = 'globe-grid';
    globeGrid.style.position = 'absolute';
    globeGrid.style.top = '50%';
    globeGrid.style.left = '50%';
    globeGrid.style.width = '220px';
    globeGrid.style.height = '220px';
    globeGrid.style.marginTop = '-110px';
    globeGrid.style.marginLeft = '-110px';
    globeGrid.style.borderRadius = '50%';
    globeGrid.style.background = 'url("https://cdn.pixabay.com/photo/2018/03/30/09/14/globe-3274839_1280.png")';
    globeGrid.style.backgroundSize = 'cover';
    globeGrid.style.opacity = '0.7';
    globeGrid.style.zIndex = '3';
    globeGrid.style.animation = 'rotate-grid 180s linear infinite';
    globeContainer.appendChild(globeGrid);
    
    // Remove loading spinner
    const loadingElement = globeContainer.querySelector('.globe-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    // Create stars in the background
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'globe-star';
        star.style.position = 'absolute';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = '#ffffff';
        star.style.borderRadius = '50%';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.zIndex = '1';
        star.style.animation = `twinkle ${Math.random() * 5 + 2}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        globeContainer.appendChild(star);
    }
    
    // Create connection nodes on the globe
    const nodeCount = 12;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'globe-node';
        
        // Calculate position on the sphere using spherical coordinates
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        
        // Convert to Cartesian coordinates
        const x = Math.cos(theta) * Math.sin(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(phi);
        
        // Store the 3D position for later use
        node.dataset.x = x;
        node.dataset.y = y;
        node.dataset.z = z;
        
        // Set initial position
        updateNodePosition(node);
        
        // Style the node
        node.style.position = 'absolute';
        node.style.width = '8px';
        node.style.height = '8px';
        node.style.backgroundColor = '#ffffff';
        node.style.borderRadius = '50%';
        node.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        node.style.zIndex = '4';
        node.style.transition = 'all 0.3s ease';
        
        // Add pulse animation
        node.style.animation = `pulse-node ${3 + Math.random() * 2}s ease-in-out infinite`;
        node.style.animationDelay = `${Math.random() * 2}s`;
        
        nodes.push(node);
        globeContainer.appendChild(node);
    }
    
    // Create social media icons
    const socialIcons = [
        { icon: 'fab fa-linkedin', color: '#0077B5', name: 'LinkedIn' },
        { icon: 'fab fa-facebook', color: '#1877F2', name: 'Facebook' },
        { icon: 'fab fa-twitter', color: '#1DA1F2', name: 'Twitter' },
        { icon: 'fab fa-instagram', color: '#E4405F', name: 'Instagram' },
        { icon: 'fab fa-youtube', color: '#FF0000', name: 'YouTube' },
        { icon: 'fab fa-pinterest', color: '#BD081C', name: 'Pinterest' },
        { icon: 'fab fa-tiktok', color: '#000000', name: 'TikTok' },
        { icon: 'fab fa-snapchat', color: '#FFFC00', name: 'Snapchat' }
    ];
    
    // Create orbits and social icons
    const orbits = [];
    const connections = [];
    
    socialIcons.forEach((social, index) => {
        // Create orbit
        const orbit = document.createElement('div');
        orbit.className = 'globe-orbit';
        orbit.style.position = 'absolute';
        orbit.style.top = '50%';
        orbit.style.left = '50%';
        orbit.style.width = `${260 + index * 30}px`;
        orbit.style.height = `${260 + index * 30}px`;
        orbit.style.marginTop = `-${(260 + index * 30) / 2}px`;
        orbit.style.marginLeft = `-${(260 + index * 30) / 2}px`;
        orbit.style.borderRadius = '50%';
        orbit.style.border = '1px dashed rgba(255, 255, 255, 0.15)';
        orbit.style.zIndex = '3';
        orbit.style.transform = `rotateX(20deg) rotateY(${index * 15}deg)`;
        orbits.push(orbit);
        globeContainer.appendChild(orbit);
        
        // Create social icon
        const icon = document.createElement('div');
        icon.className = 'globe-social-icon';
        icon.dataset.name = social.name;
        
        // Style the icon container
        icon.style.position = 'absolute';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.width = '50px';
        icon.style.height = '50px';
        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        icon.style.borderRadius = '50%';
        icon.style.boxShadow = `0 0 20px ${social.color}`;
        icon.style.zIndex = '5';
        icon.style.cursor = 'pointer';
        
        // Position at top of orbit initially
        icon.style.top = '0';
        icon.style.left = '50%';
        icon.style.marginLeft = '-25px';
        
        // Add animation - rotate around the orbit (much slower)
        icon.style.animation = `rotate-around ${30 + index * 10}s linear infinite`;
        icon.style.animationDelay = `${index * -3}s`;
        
        // Create the icon element
        const i = document.createElement('i');
        i.className = social.icon;
        i.style.color = social.color;
        i.style.fontSize = '28px';
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'globe-tooltip';
        tooltip.textContent = social.name;
        tooltip.style.position = 'absolute';
        tooltip.style.top = '-30px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        tooltip.style.zIndex = '6';
        
        // Show tooltip on hover
        icon.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
        });
        
        icon.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
        
        // Connect to a random node
        const randomNodeIndex = Math.floor(Math.random() * nodes.length);
        const connectedNode = nodes[randomNodeIndex];
        
        // Create connection line
        const connection = document.createElement('div');
        connection.className = 'globe-connection';
        connection.style.position = 'absolute';
        connection.style.top = '0';
        connection.style.left = '0';
        connection.style.width = '100px'; // Will be updated dynamically
        connection.style.height = '3px';
        connection.style.background = `linear-gradient(to right, ${social.color}00, ${social.color}, ${social.color}00)`;
        connection.style.zIndex = '3';
        connection.style.transformOrigin = 'left center';
        connection.style.opacity = '0.8';
        
        // Store references for animation
        connection.dataset.nodeIndex = randomNodeIndex;
        connection.dataset.iconIndex = index;
        
        connections.push(connection);
        globeContainer.appendChild(connection);
        
        icon.appendChild(i);
        icon.appendChild(tooltip);
        orbit.appendChild(icon);
    });
    
    // Animation function to update node positions and connections
    function animate() {
        const time = Date.now() / 1000;
        
        // Update node positions based on globe rotation (only every few frames for performance)
        if (Math.floor(time * 10) % 3 === 0) {
            nodes.forEach((node, index) => {
                updateNodePosition(node, time);
            });
        }
        
        // Update connections between nodes and social icons
        connections.forEach((connection) => {
            const nodeIndex = parseInt(connection.dataset.nodeIndex);
            const iconIndex = parseInt(connection.dataset.iconIndex);
            
            if (nodeIndex >= 0 && nodeIndex < nodes.length && iconIndex >= 0 && iconIndex < socialIcons.length) {
                const node = nodes[nodeIndex];
                const orbit = orbits[iconIndex];
                const icon = orbit.querySelector('.globe-social-icon');
                
                if (node && icon) {
                    // Get positions
                    const nodeRect = node.getBoundingClientRect();
                    const iconRect = icon.getBoundingClientRect();
                    const containerRect = globeContainer.getBoundingClientRect();
                    
                    // Calculate relative positions
                    const nodeX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
                    const nodeY = nodeRect.top + nodeRect.height / 2 - containerRect.top;
                    const iconX = iconRect.left + iconRect.width / 2 - containerRect.left;
                    const iconY = iconRect.top + iconRect.height / 2 - containerRect.top;
                    
                    // Calculate distance and angle
                    const dx = iconX - nodeX;
                    const dy = iconY - nodeY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    // Update connection line
                    connection.style.width = `${distance}px`;
                    connection.style.top = `${nodeY}px`;
                    connection.style.left = `${nodeX}px`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    
                    // Adjust opacity based on z-position of node
                    const z = parseFloat(node.dataset.z);
                    connection.style.opacity = z > 0 ? 0.4 + 0.6 * z : 0.1;
                    
                    // Make the social icon more visible
                    icon.style.opacity = '1';
                    icon.style.boxShadow = `0 0 20px ${socialIcons[iconIndex].color}`;
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Function to update node position based on 3D coordinates
    function updateNodePosition(node, time = 0) {
        const radius = 110; // Half of the globe diameter
        const x = parseFloat(node.dataset.x);
        const y = parseFloat(node.dataset.y);
        const z = parseFloat(node.dataset.z);
        
        // Apply rotation over time
        let rotatedX, rotatedY, rotatedZ;
        if (time) {
            const rotationSpeed = 0.03; // Much slower rotation
            const angle = time * rotationSpeed;
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            
            // Rotate around Y axis
            rotatedX = x * cosAngle + z * sinAngle;
            rotatedY = y;
            rotatedZ = -x * sinAngle + z * cosAngle;
        } else {
            rotatedX = x;
            rotatedY = y;
            rotatedZ = z;
        }
        
        // Update node dataset with new position
        node.dataset.x = rotatedX;
        node.dataset.y = rotatedY;
        node.dataset.z = rotatedZ;
        
        // Convert 3D coordinates to 2D screen position
        const centerX = 50; // percentage
        const centerY = 50; // percentage
        const nodeX = centerX + rotatedX * radius / 2.2;
        const nodeY = centerY + rotatedY * radius / 2.2;
        
        // Update node position
        node.style.left = `${nodeX}%`;
        node.style.top = `${nodeY}%`;
        
        // Scale based on z-coordinate (depth)
        const scale = 0.5 + (rotatedZ + 1) / 2;
        node.style.transform = `scale(${scale})`;
        
        // Adjust opacity based on z-coordinate
        node.style.opacity = rotatedZ > 0 ? 0.5 + 0.5 * rotatedZ : 0;
    }
    
    // Start animation
    animate();
    
    // Add all the necessary CSS animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes rotate-globe {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes rotate-grid {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-node {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.5); opacity: 1; }
        }
        
        @keyframes rotate-around {
            0% { transform: rotate(0deg) translateX(-50%) rotate(0deg); }
            25% { transform: rotate(90deg) translateX(-50%) rotate(-90deg); }
            50% { transform: rotate(180deg) translateX(-50%) rotate(-180deg); }
            75% { transform: rotate(270deg) translateX(-50%) rotate(-270deg); }
            100% { transform: rotate(360deg) translateX(-50%) rotate(-360deg); }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
        
        .globe-social-icon:hover {
            transform: scale(1.3) !important;
            box-shadow: 0 0 30px currentColor !important;
            z-index: 10 !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Add interactive hover effect to the globe
    globeContainer.addEventListener('mousemove', function(e) {
        const rect = globeContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate the center of the container
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate the distance from the center (normalized)
        const distX = (x - centerX) / centerX;
        const distY = (y - centerY) / centerY;
        
        // Apply a subtle tilt effect to the globe
        globeSphere.style.transform = `rotateY(${distX * 10}deg) rotateX(${-distY * 10}deg)`;
        globeGrid.style.transform = `rotateY(${distX * 10}deg) rotateX(${-distY * 10}deg)`;
        
        // Adjust the light reflection
        globeSphere.style.background = `radial-gradient(circle at ${30 + distX * 20}% ${30 + distY * 20}%, #1A8FE3 0%, #0A4D8C 60%, #041E42 100%)`;
    });
    
    // Reset transform when mouse leaves
    globeContainer.addEventListener('mouseleave', function() {
        globeSphere.style.transform = '';
        globeGrid.style.transform = '';
        globeSphere.style.background = 'radial-gradient(circle at 30% 30%, #1A8FE3 0%, #0A4D8C 60%, #041E42 100%)';
    });
});