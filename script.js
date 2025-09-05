document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    // Sample Comment
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.borderBottom = '2px solid transparent';
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.style.borderBottom = '2px solid var(--white)';
            }
        });
    });
    
    // Make placeholders clickable for editing
    document.querySelectorAll('.placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.contentEditable = true;
            this.focus();
        });
        
        placeholder.addEventListener('blur', function() {
            this.contentEditable = false;
        });
    });
    
    // Initialize image placeholders to allow uploads
    document.querySelectorAll('.image-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            alert('This would open a file upload dialog in a complete implementation');
        });
    });
    
    // Project hover image functionality
    const hoverImage = document.getElementById('project-hover-image');
    const projectSections = document.querySelectorAll('.project-section');
    
    // Project image content mapping
    const projectImages = {
        'gemini-planner': { type: 'image', src: 'assets/Plan.png', alt: 'Plan With A Prompt - AI Planner Interface' },
        'blueprint-ai': { type: 'image', src: 'assets/Blueprint.png', alt: 'BlueprintAI - Stable Diffusion Interface' },
        'fresh-start': { type: 'image', src: 'assets/FreshStart.png', alt: 'Fresh Start - Farm Planning Dashboard' },
        'biggie-bot': { type: 'image', src: 'assets/Biggie.png', alt: 'BiggieBot - Discord Bot Interface' },
        'psl-lab': { type: 'image', src: 'assets/PSL.png', alt: 'PSL Lab - IoT System Interface' },
        'carbon-modeling': { type: 'text', content: '📊 Carbon Modeling\n\nML with Scikit-Learn\n80%+ accuracy\n\nAgricultural data\nanalysis' },
        'os-simulation': { type: 'text', content: '💻 OS Simulation\n\nC++ Implementation\nRound Robin\n\nMemory management\nsystem' }
    };
    
    projectSections.forEach(section => {
        section.addEventListener('mouseenter', function(e) {
            const projectId = this.getAttribute('data-project');
            const projectData = projectImages[projectId];
            
            if (!projectData) return;
            
            // Clear previous content and classes
            hoverImage.innerHTML = '';
            hoverImage.className = 'project-hover-image';
            
            if (projectData.type === 'image') {
                // Create and display image
                const img = document.createElement('img');
                img.src = projectData.src;
                img.alt = projectData.alt;
                img.onerror = function() {
                    // Fallback to text if image fails to load
                    hoverImage.innerHTML = `Image not found:<br>${projectData.alt}`;
                    hoverImage.classList.add('text-content');
                };
                hoverImage.appendChild(img);
                hoverImage.classList.add('image-content');
            } else {
                // Display text content
                hoverImage.innerHTML = projectData.content.replace(/\n/g, '<br>');
                hoverImage.classList.add('text-content');
            }
            
            hoverImage.classList.add('show');
            
            // Position the image near the cursor but offset to the side
            const updatePosition = (event) => {
                const x = event.clientX + 20;
                const y = event.clientY - 100;
                
                // Keep image within viewport
                const maxX = window.innerWidth - hoverImage.offsetWidth - 20;
                const maxY = window.innerHeight - hoverImage.offsetHeight - 20;
                
                hoverImage.style.left = Math.min(x, maxX) + 'px';
                hoverImage.style.top = Math.max(20, Math.min(y, maxY)) + 'px';
            };
            
            updatePosition(e);
            this.addEventListener('mousemove', updatePosition);
            
            this.addEventListener('mouseleave', function() {
                hoverImage.classList.remove('show');
                this.removeEventListener('mousemove', updatePosition);
            }, { once: true });
        });
    });
});