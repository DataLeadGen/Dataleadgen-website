document.addEventListener('DOMContentLoaded', function() {
  const globeContainer = document.getElementById('globe-container');
  
  if (globeContainer) {
    console.log('Globe container found, initializing social media universe globe');
    
    // Remove loading spinner
    const loadingElement = globeContainer.querySelector('.globe-loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    // Create the globe wrapper
    const globeWrapper = document.createElement('div');
    globeWrapper.className = 'globe-wrapper';
    
    // Create SVG for orbit paths
    const svg = document.createElement('svg');
    
    // Create orbit paths - add more orbits for more icons
    const orbits = [90, 130, 170, 210, 250];
    orbits.forEach((radius, index) => {
      const orbitPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      orbitPath.setAttribute('class', 'orbit-path');
      orbitPath.setAttribute('cx', '250');
      orbitPath.setAttribute('cy', '250');
      orbitPath.setAttribute('r', radius.toString());
      svg.appendChild(orbitPath);
    });
    
    // Create the globe element
    const globe = document.createElement('div');
    globe.className = 'globe';
    
    // Create a separate container for the text to keep it stationary
    const textContainer = document.createElement('div');
    textContainer.className = 'globe-text-container';
    
    // Add Data Lead Gen name to the center
    const globeText = document.createElement('div');
    globeText.className = 'globe-text';
    globeText.textContent = 'Data Lead Gen';
    
    // Add text to the container, then add container to the wrapper (not the rotating globe)
    textContainer.appendChild(globeText);
    globeWrapper.appendChild(textContainer);
    
    // Create social media icons
    const socialMediaIcons = [
      { id: 'icon1', url: 'https://facebook.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145802.png' },
      { id: 'icon2', url: 'https://twitter.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145812.png' },
      { id: 'icon3', url: 'https://instagram.com', image: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' },
      { id: 'icon4', url: 'https://linkedin.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145807.png' },
      { id: 'icon5', url: 'https://youtube.com', image: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' },
      { id: 'icon6', url: 'https://whatsapp.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145804.png' },
      { id: 'icon7', url: 'https://pinterest.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145808.png' },
      { id: 'icon8', url: 'https://snapchat.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145867.png' },
      { id: 'icon9', url: 'https://tiktok.com', image: 'https://cdn-icons-png.flaticon.com/512/3046/3046122.png' },
      { id: 'icon10', url: 'https://reddit.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145814.png' },
      { id: 'icon11', url: 'https://telegram.org', image: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png' },
      { id: 'icon12', url: 'https://discord.com', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png' },
      { id: 'icon13', url: 'https://medium.com', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968906.png' },
      { id: 'icon14', url: 'https://tumblr.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145811.png' },
      { id: 'icon15', url: 'https://vimeo.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145809.png' },
      { id: 'icon16', url: 'https://quora.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145815.png' },
      { id: 'icon17', url: 'https://slack.com', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968543.png' },
      { id: 'icon18', url: 'https://twitch.tv', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png' },
      { id: 'icon19', url: 'https://github.com', image: 'https://cdn-icons-png.flaticon.com/512/733/733553.png' },
      { id: 'icon20', url: 'https://dribbble.com', image: 'https://cdn-icons-png.flaticon.com/512/145/145801.png' }
    ];
    
    socialMediaIcons.forEach(icon => {
      const iconElement = document.createElement('a');
      iconElement.className = 'icon';
      iconElement.id = icon.id;
      iconElement.href = icon.url;
      iconElement.target = '_blank';
      iconElement.style.backgroundImage = `url('${icon.image}')`;
      globeWrapper.appendChild(iconElement);
    });
    
    // Add floating particles for enhanced visual effect
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      globeWrapper.appendChild(particle);
    }
    
    // Add elements to the wrapper
    globeWrapper.appendChild(svg);
    globeWrapper.appendChild(globe);
    
    // Add the wrapper to the container
    globeContainer.appendChild(globeWrapper);
    
    // Animation logic - updated for more icons
    // Create speeds for all icons with slight variations
    const speeds = [];
    for (let i = 0; i < socialMediaIcons.length; i++) {
      // Alternate between clockwise and counter-clockwise rotation
      const direction = i % 2 === 0 ? 1 : -1;
      // Vary the speed slightly based on the orbit
      const baseSpeed = 0.005 + (i % 5) * 0.001;
      speeds.push(baseSpeed * direction);
    }
    
    // Distribute starting angles evenly
    let angles = [];
    for (let i = 0; i < socialMediaIcons.length; i++) {
      // Calculate angle based on position in orbit
      const orbitIndex = i % orbits.length;
      // How many icons in this orbit
      const iconsInOrbit = Math.ceil(socialMediaIcons.length / orbits.length);
      // Calculate starting angle to distribute evenly
      angles.push((i * 360 / socialMediaIcons.length) * (Math.PI / 180));
    }
    
    function animate() {
      socialMediaIcons.forEach((icon, i) => {
        const iconElement = document.getElementById(icon.id);
        angles[i] += speeds[i];
        const r = orbits[i % orbits.length];
        const cx = 250;
        const cy = 250;
        const x = cx + r * Math.cos(angles[i]);
        const y = cy + r * Math.sin(angles[i]);
        iconElement.style.left = `${x}px`;
        iconElement.style.top = `${y}px`;
      });
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
  } else {
    console.error('Globe container not found! Check if the element with ID "globe-container" exists in the HTML.');
  }
});