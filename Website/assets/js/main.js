

// // ================================================================
// // LOADING SCREEN LOGIC

// // 1. The page loads. The loader is visible, main page is hidden.
// // 2. We use setInterval() to run a function every 20ms.
// // 3. Each time it runs, we increase a counter (0 → 100).
// // 4. We update the bar width and the percentage text.
// // 5. When counter hits 100, we stop the interval.
// // 6. We hide the loader (fade out via CSS class).
// // 7. We show the main page (fade in via CSS class).
// // ================================================================

// // ----------------------------------------------------------------
// // Step 1: Grab references to the HTML elements we need to control.
// //
// // document.getElementById('x') finds the element with id="x"
// // and gives us a JavaScript object we can manipulate.
// // We store them in variables so we don't have to search
// // for them every single time we need them.
// // ----------------------------------------------------------------
// const loader      = document.getElementById('loader');
// const mainPage    = document.getElementById('main-page');
// const barFill     = document.getElementById('loader-bar-fill');
// const loaderNum   = document.getElementById('loader-num');


// // ----------------------------------------------------------------
// // Step 2: Set up our counter variable.
// // This tracks progress from 0 to 100.
// // It lives OUTSIDE the interval function so it persists
// // between each call (if it were inside, it would reset to 0
// // every 20ms — nothing would ever progress).
// // ----------------------------------------------------------------
// let progress = 0;


// // ----------------------------------------------------------------
// // Step 3: The loading interval.
// //
// // setInterval(function, milliseconds) calls a function
// // repeatedly with a pause between each call.
// // 20ms = 50 calls per second = smooth animation.
// //
// // We store the return value in `loadingInterval` so we can
// // call clearInterval() to STOP it when progress hits 100.
// // ----------------------------------------------------------------
// const loadingInterval = setInterval(function() {

//   // --- Increase progress ---
//   // We don't increase by exactly 1 every time — that would
//   // look mechanical. Instead we add a random amount between
//   // 0.5 and 2.5 so it feels natural, like a real loading bar.
//   progress += Math.random() * 2 + 0.5;

//   // --- Cap at 100 ---
//   // Math.min() returns the smaller of the two values.
//   // This prevents progress from ever going above 100.
//   progress = Math.min(progress, 100);

//   // --- Update the visual bar ---
//   // We set the CSS width of the fill bar to match the progress.
//   // CSS transition (defined in style.css) makes it animate smoothly.
//   barFill.style.width = progress + '%';

//   // --- Update the percentage text ---
//   // Math.floor() rounds DOWN to the nearest whole number.
//   // We don't want to show "loading 63.47%" — just "loading 63%".
//   loaderNum.textContent = Math.floor(progress);

//   // --- Check if we're done ---
//   if (progress >= 100) {

//     // STOP the interval — no more calls after this
//     clearInterval(loadingInterval);

//     // Wait 400ms at 100% so the user can SEE it completed
//     // before we start the exit animation.
//     // setTimeout(function, delay) runs a function ONCE after a delay.
//     setTimeout(function() {
//       finishLoading();
//     }, 400);
//   }

// }, 20); // ← runs every 20 milliseconds


// // ----------------------------------------------------------------
// // Step 4: The finish function — hides loader, shows page.
// // We separate this into its own function to keep the code clean.
// // A function = a named block of code we can call by name.
// // ----------------------------------------------------------------
// function finishLoading() {

//   // Add the CSS class that triggers the fade-out animation.
//   // Remember in style.css: #loader.loader-hidden { opacity: 0; }
//   // Adding this class ACTIVATES that rule → smooth fade out.
//   loader.classList.add('loader-hidden');

//   // Wait for the loader fade-out to finish (0.8s, matching the CSS
//   // transition duration) THEN show the main page.
//   setTimeout(function() {

//     // Add the class that makes the main page visible.
//     // In style.css: #main-page.page-visible { opacity: 1; }
//     mainPage.classList.add('page-visible');

//   }, 800); // ← 800ms matches the CSS transition: opacity 0.8s
// }


// // ================================================================
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