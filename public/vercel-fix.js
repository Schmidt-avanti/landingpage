// Spezifische Fixes für Vercel-Deployment
document.addEventListener('DOMContentLoaded', function() {
  console.log('Vercel-Fix geladen');
  
  // Sofortiges Einblenden kritischer Elemente ohne Animationen
  setTimeout(function() {
    // Hero-Bereich - kritische Elemente direkt sichtbar machen
    const heroElements = document.querySelectorAll('.heroContent .animate');
    heroElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
    
    // Semi-Bereich mit Texten und Bild
    const semiElements = document.querySelectorAll('.semi-section .animate');
    semiElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
    
    // Service-Karten sichtbar machen
    const serviceCards = document.querySelectorAll('.showCardContainer');
    serviceCards.forEach(card => {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.transform = 'none';
    });
    
    // Aaron-Bereich speziell behandeln
    const aaronElements = document.querySelectorAll('#aaron, .quoteBox');
    aaronElements.forEach(el => {
      if (el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
      }
    });
    
    // Erzwinge absolute URLs in href-Attributen von bestimmten Links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/datenschutz') {
        link.setAttribute('href', '/datenschutz.html');
      } else if (href === '/impressum') {
        link.setAttribute('href', '/impressum.html');
      } else if (href === '/preise') {
        link.setAttribute('href', '/preise.html');
      }
    });
    
    console.log('Vercel-Fixes angewendet');
  }, 500);
});
