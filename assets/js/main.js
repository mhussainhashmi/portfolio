// // EVERYTHING BELOW THIS LINE will be added in future steps:
// // - loadProjects()    → fetches projects from Supabase
// // - renderProjects()  → builds project cards in HTML
// // - handleContactForm() → submits the contact form to Supabase
// // ================================================================



// ================================================================
// LOADING SCREEN LOGIC
// ================================================================

const loader      = document.getElementById('loader');
const mainPage    = document.getElementById('main-page');
const barFill     = document.getElementById('loader-bar-fill');
const loaderNum   = document.getElementById('loader-num');

let progress = 0;                    // Starts at 0

// This controls how fast the bar fills
// We use a fixed time target (~2.4 seconds) instead of random speed
const totalDuration = 2000;          // 2000 milliseconds = ~2.4 seconds
const intervalTime = 20;             // Update every 20ms
const steps = totalDuration / intervalTime;
let increment = 100 / steps;         // How much to add each step

const loadingInterval = setInterval(() => {

    progress += increment;

    // Safety: never go above 100
    if (progress > 100) progress = 100;

    // Update the bar width and percentage text
    barFill.style.width = progress + '%';
    loaderNum.textContent = Math.floor(progress);

    // When loading is complete
    if (progress >= 100) {
        clearInterval(loadingInterval);
        
        // Small pause at 100% so it feels complete
        setTimeout(finishLoading, 300);
    }

}, intervalTime);


// Finish loading and show the actual website
function finishLoading() {
    loader.classList.add('loader-hidden');   // Trigger fade-out

    // After fade-out animation finishes, show main content
    setTimeout(() => {
        mainPage.classList.add('page-visible');
    }, 800);
}


// ====================== MOUSE SPOTLIGHT WITH DELAY ======================

const spotlight = document.getElementById('mouse-spotlight');
let mouseX = 50;
let mouseY = 50;
let currentX = 50;
let currentY = 50;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 100;
  mouseY = (e.clientY / window.innerHeight) * 100;
});

// Smooth trailing effect (small delay)
function updateSpotlight() {
  currentX += (mouseX - currentX) * 0.12;   // 0.12 = delay strength (lower = more delay)
  currentY += (mouseY - currentY) * 0.12;

  spotlight.style.setProperty('--mouse-x', `${currentX}%`);
  spotlight.style.setProperty('--mouse-y', `${currentY}%`);

  requestAnimationFrame(updateSpotlight);
}

updateSpotlight();




// ====================== DARK / LIGHT MODE ======================
// Bootstrap reads data-bs-theme="dark" or "light" on <html>
// and switches ALL its component colors automatically.

// ====================== DARK / LIGHT MODE (with debugging) ======================

const themeToggle = document.getElementById('theme-toggle');

console.log("Theme toggle button found:", themeToggle !== null);

function setTheme(isDark) {
  console.log("setTheme called with isDark =", isDark);
  
  if (isDark) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    themeToggle.textContent = '☀️';
    console.log("Switched to DARK mode");
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    themeToggle.textContent = '🌙';
    console.log("Switched to LIGHT mode");
  }
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme');
console.log("Saved theme from localStorage:", savedTheme);

if (savedTheme === 'light') {
  setTheme(false);
} else {
  setTheme(true);   // default to dark
}

// Click handler
themeToggle.addEventListener('click', () => {
  console.log("Theme toggle button clicked");
  const isCurrentlyDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  console.log("Current theme is dark:", isCurrentlyDark);
  setTheme(!isCurrentlyDark);
});


// ====================== TYPING EFFECT IN HERO ======================

const words = [
  "web experiences",
  "modern websites",
  "useful tools",
  "clean solutions",
  "digital products"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typing-text');

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 70;

  // When word is fully typed
  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;        // Pause at end of word
    isDeleting = true;
  } 
  // When word is fully deleted
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;   // Move to next word
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

// Start the typing effect when page is loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    typeEffect();
  }, 800);   // Small delay after loader finishes
});



// ====================== MAGNETIC BUTTON EFFECT ======================

const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move button slightly toward cursor
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});




// ====================== PROJECTS SECTION ======================

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "My personal portfolio built with HTML, CSS, Bootstrap and JavaScript.",
    image: "images/project1.jpg",           // change to your actual image
    link: "#"
  },
  {
    id: 2,
    title: "Task Manager App",
    description: "A simple and clean to-do list application with local storage.",
    image: "images/project2.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather app using a public API.",
    image: "images/project3.jpg",
    link: "#"
  }
];

function renderProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = '';

  projects.forEach(project => {
    const cardHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="project-card">
          <img src="${project.image}" alt="${project.title}">
          <div class="project-overlay">
            <h5>${project.title}</h5>
            <p>${project.description}</p>
            <a href="${project.link}" class="btn btn-primary btn-sm">Visit Project</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// Call renderProjects after the page is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    renderProjects();
  }, 1000);
});




// ====================== CONTACT FORM ======================

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // For now, just show success message (we'll connect Supabase later)
  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been received.`);
    
    // Reset form
    contactForm.reset();
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }, 800);
});