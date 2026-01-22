// Preloader - Hide on page load
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Hero Media Slider (for homepage)
const heroSlides = document.querySelectorAll('.hero-slide');
const heroVideos = document.querySelectorAll('.hero-video');
const allHeroMedia = document.querySelectorAll('.hero-video, .hero-slide');

if (allHeroMedia.length > 0) {
  let currentMedia = 0;

  function playCurrentMedia() {
    allHeroMedia.forEach((el, i) => {
      if (i === currentMedia) {
        el.classList.add('active');
        // If it's a video, play it
        if (el.tagName === 'VIDEO') {
          el.play().catch(e => console.log('Video play failed:', e));
        }
      } else {
        el.classList.remove('active');
        // If it's a video, pause and reset
        if (el.tagName === 'VIDEO') {
          el.pause();
          el.currentTime = 0;
        }
      }
    });
  }

  function nextMedia() {
    currentMedia = (currentMedia + 1) % allHeroMedia.length;
    playCurrentMedia();
  }

  // Auto-advance media every 6 seconds
  let mediaInterval = setInterval(nextMedia, 6000);

  // Listen for video end to advance immediately
  allHeroMedia.forEach((el, index) => {
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
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#" or empty
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Close mobile menu if open
      const navCollapse = document.getElementById('nav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navCollapse, {
          toggle: true
        });
      }
    }
  });
});