// 1. Remove Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 600);
  }
});

// 2. Video Initialization (1 Video)
const heroVid = document.getElementById("heroVideo");
if (heroVid) {
  // Only load and play video on desktop/large screens
  if (window.innerWidth >= 992) {
    heroVid.src = "assets/videos/video1.mp4";
    heroVid.play().catch(e => console.log("Video autoplay blocked or file missing."));
  } else {
    heroVid.style.display = "none";
  }
}

// 3. Auto-Swapping Gallery (15 Images)
// This will cycle 4 visible slots through all 15 images
const imageDatabase = [];
for (let i = 1; i <= 15; i++) {
  imageDatabase.push(`assets/photos/img${i}.jpg`);
}

const displaySlots = document.querySelectorAll(".swap-img");
let currentPointer = displaySlots.length; // Start pointing to the 5th image

// Initial setup for the first 4 slots
displaySlots.forEach((img, idx) => {
  if (imageDatabase[idx]) img.src = imageDatabase[idx];
});

// Swapping interval
setInterval(() => {
  displaySlots.forEach((img) => {
    img.classList.add("fade-out");
    
    setTimeout(() => {
      // Pick next image in line
      img.src = imageDatabase[currentPointer % imageDatabase.length];
      img.classList.remove("fade-out");
      currentPointer++;
    }, 800);
  });
}, 5000); // Change every 5 seconds