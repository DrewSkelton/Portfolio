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
    
    // Carousel functionality
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselIndicators = document.getElementById('carousel-indicators');
    const carouselCaption = document.getElementById('carousel-caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Project image content mapping
    const projectImages = {
        'gemini-planner': { 
            type: 'image', 
            src: 'assets/Plan.png', 
            alt: 'Plan With A Prompt - AI Planner Interface',
            title: 'Generative AI Planners - Plan With A Prompt'
        },
        'blueprint-ai': { 
            type: 'image', 
            src: 'assets/Blueprint.png', 
            alt: 'BlueprintAI - Stable Diffusion Interface',
            title: 'Stable Diffusion App - BlueprintAI'
        },
        'fresh-start': { 
            type: 'image', 
            src: 'assets/FreshStart.png', 
            alt: 'Fresh Start - Farm Planning Dashboard',
            title: 'AI Farm Planning Dashboard - Fresh Start'
        },
        'biggie-bot': { 
            type: 'image', 
            src: 'assets/Biggie.png', 
            alt: 'BiggieBot - Discord Bot Interface',
            title: 'BiggieBot - Discord Bot'
        },
        'psl-lab': { 
            type: 'image', 
            src: 'assets/PSL.png', 
            alt: 'PSL Lab - IoT System Interface',
            title: 'Filley Lab - PSL IoT System'
        },
        'carbon-modeling': { 
            type: 'text', 
            content: '📊 Carbon Modeling\n\nML with Scikit-Learn\n80%+ accuracy\n\nAgricultural data\nanalysis',
            title: 'Carbon Statistical Modeling'
        },
        'os-simulation': { 
            type: 'text', 
            content: '💻 OS Simulation\n\nC++ Implementation\nRound Robin\n\nMemory management\nsystem',
            title: 'OS Simulation - C++'
        }
    };
    
    let currentSlide = 0;
    const totalSlides = Object.keys(projectImages).length;
    
    // Initialize carousel
    function initializeCarousel() {
        // Create slides
        Object.entries(projectImages).forEach(([key, data]) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            if (data.type === 'image') {
                const img = document.createElement('img');
                img.src = data.src;
                img.alt = data.alt;
                img.onerror = function() {
                    // Fallback to text if image fails to load
                    slide.innerHTML = `Image not found:<br>${data.alt}`;
                    slide.classList.add('text-content');
                };
                slide.appendChild(img);
            } else {
                slide.innerHTML = data.content.replace(/\n/g, '<br>');
                slide.classList.add('text-content');
            }
            
            carouselSlides.appendChild(slide);
        });
        
        // Create indicators
        Object.entries(projectImages).forEach(([key, data], index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            carouselIndicators.appendChild(indicator);
        });
        
        // Update initial caption
        updateCaption();
    }
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselSlides.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        updateCaption();
    }
    
    // Update caption
    function updateCaption() {
        const currentData = Object.values(projectImages)[currentSlide];
        carouselCaption.textContent = currentData.title;
    }
    
    // Navigate to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance carousel (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide and pause on hover
    startAutoSlide();
    
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Initialize the carousel
    initializeCarousel();
});