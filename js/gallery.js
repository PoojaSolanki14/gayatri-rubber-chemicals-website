// Gallery Images Auto-Rotation
// This script rotates through images in the gallery

// Generate array of image paths (adjust based on your actual image count)
const galleryImages = [];
for (let i = 1; i <= 15; i++) {
  galleryImages.push(`assets/photos/img${i}.jpg`);
}

// Get all gallery image slots
const gallerySlots = document.querySelectorAll(".gallery-img, .swap-img");

if (gallerySlots.length > 0) {
  let imgIndex = 0;

  // Initialize gallery with first images
  gallerySlots.forEach((img, i) => {
    img.src = galleryImages[i % galleryImages.length];
    img.alt = `Manufacturing facility photo ${i + 1}`;
    img.loading = "lazy"; // Lazy load for performance
  });

  // Auto-rotate gallery images every 4 seconds
  setInterval(() => {
    gallerySlots.forEach(img => {
      // Add fade-out class
      img.classList.add("fade-out");
      
      // After fade-out completes, change image and fade back in
      setTimeout(() => {
        img.src = galleryImages[imgIndex % galleryImages.length];
        img.alt = `Manufacturing facility photo ${(imgIndex % galleryImages.length) + 1}`;
        img.classList.remove("fade-out");
        imgIndex++;
      }, 800); // Match with CSS transition time
    });
  }, 4000); // Rotate every 4 seconds
}