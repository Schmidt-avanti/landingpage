import './style.css';

// Add any JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
  console.log('Avanti landing page loaded');
  
  // Example: Smooth scrolling for anchor links (redundant with scroll-smooth in CSS, but added as a fallback)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lade die Komponenten asynchron
  loadComponent('header-container', '/src/components/layout/Header.html');
  loadComponent('hero-container', '/src/components/sections/Hero.html');
  loadComponent('about-container', '/src/components/sections/About.html');
  loadComponent('key-figures-container', '/src/components/sections/KeyFigures.html');
  loadComponent('services-container', '/src/components/sections/Services.html');
  loadComponent('blog-container', '/src/components/sections/Blog.html');
  loadComponent('contact-container', '/src/components/sections/Contact.html');
  loadComponent('footer-container', '/src/components/layout/Footer.html');
});

// Funktion zum Laden von Komponenten
async function loadComponent(containerId, componentPath) {
  try {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container mit ID ${containerId} nicht gefunden`);
      return;
    }
    
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    container.innerHTML = html;
    
    // Alpine.js neu initialisieren, falls vorhanden
    if (window.Alpine) {
      window.Alpine.initTree(container);
    }
    
    console.log(`Komponente ${componentPath} erfolgreich geladen`);
  } catch (error) {
    console.error(`Fehler beim Laden der Komponente ${componentPath}:`, error);
  }
}
