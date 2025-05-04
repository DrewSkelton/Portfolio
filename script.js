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
});