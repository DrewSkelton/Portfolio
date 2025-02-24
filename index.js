// Sample photos array - replace with your own photos
const galleryPhotos = [
    { url: 'assets/BeatBama.JPG', caption: 'Pregame Before we Beat Bama!' },
    { url: 'assets/Willoughby.png', caption: 'Friends at my favorite spot on campus' },
    { url: 'assets/Rip24.JPG', caption: 'Resistance Drumline' },
    { url: 'assets/Cat.png', caption: 'My cat, Lola bothering me' },
    { url: 'assets/Jazz.png', caption: 'Jazz combo' },
    { url: 'assets/Rip22.png', caption: 'More Resistance Drumline' }
];

const galleryDesigns = [
    { url: 'assets/FreshStart.png', caption: 'Fresh Start - Logo!' },
    { url: 'assets/FSDashboard.png', caption: 'Fresh Start - Dashboard' },
    { url: 'assets/FSEquipment.png', caption: 'Fresh Start - Equipment' },
    { url: 'assets/FSLayout.png', caption: 'Fresh Start - Layout' },
    { url: 'assets/DrewgAquarium.png', caption: 'DrewgAquarium - Styling exercise' },
    { url: 'assets/RPS.png', caption: 'RPS - JS exercise' }
];

// Function to load photos into gallery
function loadDesignsGallery() {
    const gallery = document.getElementById('designsGallery');
    
    galleryDesigns.forEach(design => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-caption', design.caption);
        
        const img = document.createElement('img');
        img.src = design.url;
        img.alt = design.caption;
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });
}

function loadPhotosGallery() {
    const gallery = document.getElementById('photosGallery');
    
    galleryPhotos.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-caption', photo.caption);
        
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.caption;
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });
}

// Initialize gallery when page loads
window.addEventListener('load', () => {
    loadDesignsGallery();
    loadPhotosGallery();
});

// Update navigation to include both gallery sections
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        let targetId = this.getAttribute('href');
        // Update gallery link to point to first gallery section
        if (targetId === '#gallery') {
            targetId = '#designs-gallery';
        }
        const section = document.querySelector(targetId);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});
