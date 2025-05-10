/**
 * Image Gallery Handler
 * Loads images from specified folders via AJAX calls to the server
 */

// Image collections
let photoshootImages = [];
let dailyImages = [];

// Current image indices
let photoshootImageIndex = 0;
let dailyImageIndex = 0;

// DOM Elements
const galleryImageElement = document.getElementById('galleryImage');
const dailyImageElement = document.getElementById('galleryImageDaily');

/**
 * Load images from server
 */
function loadGalleryImages() {
    // Load photoshoot images
    fetch('/api/images/photoshoot')
        .then(response => response.json())
        .then(data => {
            photoshootImages = data;
            if (photoshootImages.length > 0) {
                updateGalleryImage();
            } else {
                galleryImageElement.src = 'placeholder.jpg';
                console.log('No photoshoot images found');
            }
        })
        .catch(error => {
            console.error('Error loading photoshoot images:', error);
            galleryImageElement.src = 'placeholder.jpg';
        });

    // Load daily images
    fetch('/api/images/daily')
        .then(response => response.json())
        .then(data => {
            dailyImages = data;
            if (dailyImages.length > 0) {
                updateDailyImage();
            } else {
                dailyImageElement.src = 'placeholder_daily.jpg';
                console.log('No daily images found');
            }
        })
        .catch(error => {
            console.error('Error loading daily images:', error);
            dailyImageElement.src = 'placeholder_daily.jpg';
        });
}

/**
 * Update gallery image display
 */
function updateGalleryImage() {
    if (photoshootImages.length === 0) return;
    
    galleryImageElement.src = photoshootImages[photoshootImageIndex];
    galleryImageElement.alt = `Our Photo ${photoshootImageIndex + 1} of ${photoshootImages.length}`;
}

/**
 * Update daily image display
 */
function updateDailyImage() {
    if (dailyImages.length === 0) return;
    
    dailyImageElement.src = dailyImages[dailyImageIndex];
    dailyImageElement.alt = `Our Daily Photo ${dailyImageIndex + 1} of ${dailyImages.length}`;
}

/**
 * Change photoshoot image based on direction (prev/next)
 */
function changeImage(direction) {
    if (photoshootImages.length === 0) return;
    
    photoshootImageIndex += direction;
    
    if (photoshootImageIndex < 0) {
        photoshootImageIndex = photoshootImages.length - 1;
    } else if (photoshootImageIndex >= photoshootImages.length) {
        photoshootImageIndex = 0;
    }
    
    updateGalleryImage();
}

/**
 * Change daily image based on direction (prev/next)
 */
function changeImageDaily(direction) {
    if (dailyImages.length === 0) return;
    
    dailyImageIndex += direction;
    
    if (dailyImageIndex < 0) {
        dailyImageIndex = dailyImages.length - 1;
    } else if (dailyImageIndex >= dailyImages.length) {
        dailyImageIndex = 0;
    }
    
    updateDailyImage();
}

// Initialize when gallery is opened
function initializeGalleries() {
    loadGalleryImages();
}
