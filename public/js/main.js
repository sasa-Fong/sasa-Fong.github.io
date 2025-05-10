// Client-side JavaScript for animations and interactions

// Stars/Meteor animation
function createStars() {
    const meteorContainer = document.querySelector('.meteor-container');
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '★';
        
        // Random starting position at top of screen
        const startX = Math.random() * window.innerWidth;
        star.style.left = `${startX}px`;
        star.style.top = '0px';
        
        // Random animation duration
        const duration = 3 + Math.random() * 6;
        star.style.animationDuration = `${duration}s`;
        
        meteorContainer.appendChild(star);
        
        // Remove the star after animation completes
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }, 800);
}

// Hearts floating animation
function createFloatingHearts() {
    const container = document.querySelector('.container');
    
    document.querySelector('.heart-btn').addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.style.left = `${Math.random() * 80 + 10}%`;
                container.appendChild(heart);
                
                // Remove the heart after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 300);
        }
    });
}

// Photo gallery functionality
function initializeGallery() {
    const galleries = document.querySelectorAll('.photo-frame');
    
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        let currentIndex = 0;
        
        gallery.querySelector('.arrow-left').addEventListener('click', () => {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            images[currentIndex].style.display = 'block';
        });
        
        gallery.querySelector('.arrow-right').addEventListener('click', () => {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';
        });
        
        // Show only first image initially
        for (let i = 1; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    });
}

// Birthday popup functionality
function initializeBirthdayPopup() {
    const birthdaySpecial = document.querySelector('.birthday-special');
    const birthdayPopup = document.querySelector('.birthday-popup');
    
    // Show popup with delay after page load
    setTimeout(() => {
        birthdaySpecial.style.display = 'flex';
        birthdayPopup.classList.add('show');
    }, 2000);
    
    // Close popup functionality
    document.querySelector('.close-popup-btn').addEventListener('click', () => {
        birthdayPopup.classList.remove('show');
        setTimeout(() => {
            birthdaySpecial.style.display = 'none';
        }, 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createFloatingHearts();
    initializeGallery();
    initializeBirthdayPopup();
});
