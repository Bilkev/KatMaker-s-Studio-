// Function to animate the counters when they enter the viewport
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  // Options for the intersection observer
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  // Callback function when the observer detects an intersection
  const callback = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNumber = parseInt(target.innerText);
        let count = 0;
        const counterInterval = setInterval(() => {
          target.innerText = count;
          count++;
          if (count > targetNumber) {
            clearInterval(counterInterval);
          }
        }, 50);
        observer.unobserve(target);
      }
    });
  };
  
  // Create an intersection observer
  const observer = new IntersectionObserver(callback, options);
  
  // Observe each counter element
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Call the function to animate counters when the page is loaded
window.addEventListener('load', animateCounters);

// JavaScript to handle lightbox functionality
const gallery = document.querySelector('.gallery');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

let currentImageIndex = 0; // Added to keep track of the current image index

gallery.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    const imgSrc = e.target.getAttribute('src');
    showLightboxWithControls(imgSrc); // Call function to show lightbox with controls
    currentImageIndex = Array.from(gallery.children).indexOf(e.target); // Get current image index
  }
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Function to show lightbox with arrow controls
function showLightboxWithControls(imgSrc) {
  const lightboxImg = document.createElement('img');
  lightboxImg.src = imgSrc;
  lightboxImg.classList.add('lightbox-img');
  while (lightbox.firstChild) {
    lightbox.removeChild(lightbox.firstChild);
  }
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);
  lightbox.style.display = 'flex';
}

// Selecting the previous and next arrow buttons
const prevBtn = document.createElement('div');
prevBtn.classList.add('arrow-btn', 'prev-btn');
prevBtn.innerHTML = '&lt;'; // Use HTML entity for left arrow

const nextBtn = document.createElement('div');
nextBtn.classList.add('arrow-btn', 'next-btn');
nextBtn.innerHTML = '&gt;'; // Use HTML entity for right arrow

// Event listeners for previous and next buttons
prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + gallery.children.length) % gallery.children.length;
  const imgSrc = gallery.children[currentImageIndex].getAttribute('src');
  showLightboxWithControls(imgSrc);
});

nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % gallery.children.length;
  const imgSrc = gallery.children[currentImageIndex].getAttribute('src');
  showLightboxWithControls(imgSrc);
});

// Prevent lightbox from closing when clicking on arrow buttons
prevBtn.addEventListener('click', e => {
  e.stopPropagation();
});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
});
