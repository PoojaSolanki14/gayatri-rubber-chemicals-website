// Preloader
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hero Media Slider (Videos + Images from assets folder)
const heroMediaElements = document.querySelectorAll('.hero-video, .hero-slide');
let currentMedia = 0;

function playCurrentMedia() {
  heroMediaElements.forEach((el, i) => {
    if (i === currentMedia) {
      el.classList.add('active');
      if (el.tagName === 'VIDEO') {
        el.play().catch(e => console.log('Video play failed:', e));
      }
    } else {
      el.classList.remove('active');
      if (el.tagName === 'VIDEO') {
        el.pause();
        el.currentTime = 0;
      }
    }
  });
}

function nextMedia() {
  currentMedia = (currentMedia + 1) % heroMediaElements.length;
  playCurrentMedia();
}

// Auto-advance media every 6 seconds
let mediaInterval = setInterval(nextMedia, 6000);

// Listen for video end to advance
heroMediaElements.forEach((el, index) => {
  if (el.tagName === 'VIDEO') {
    el.addEventListener('ended', () => {
      if (index === currentMedia) {
        clearInterval(mediaInterval);
        nextMedia();
        mediaInterval = setInterval(nextMedia, 6000);
      }
    });
  }
});

// Start first media
playCurrentMedia();

// Gallery Images from assets/photos folder
const galleryImages = [];
for (let i = 1; i <= 15; i++) {
  galleryImages.push(`assets/photos/img${i}.jpg`);
}

const slots = document.querySelectorAll(".swap-img");
let imgIndex = 0;

// Initialize gallery with first 4 images
slots.forEach((img, i) => {
  img.src = galleryImages[i % galleryImages.length];
});

// Auto-rotate gallery images every 4 seconds
setInterval(() => {
  slots.forEach(img => {
    img.classList.add("fade-out");
    setTimeout(() => {
      img.src = galleryImages[imgIndex % galleryImages.length];
      img.classList.remove("fade-out");
      imgIndex++;
    }, 800);
  });
}, 4000);

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your inquiry! We will get back to you soon.');
  e.target.reset();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});