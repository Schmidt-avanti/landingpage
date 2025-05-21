// Dieses Script stellt sicher, dass Elemente mit der Klasse "animate" 
// nach einer bestimmten Zeit sichtbar werden, auch wenn der IntersectionObserver fehlschlägt

document.addEventListener('DOMContentLoaded', function() {
  console.log('Animation Fallback geladen');
  
  // Zeitverzögerung, um dem IntersectionObserver Zeit zu geben
  setTimeout(function() {
    // Alle Elemente mit der Klasse "animate" auswählen
    const animatedElements = document.querySelectorAll('.animate');
    console.log('Gefundene Elemente mit animate-Klasse:', animatedElements.length);
    
    // Prüfen, ob Elemente noch unsichtbar sind
    animatedElements.forEach(function(element) {
      // Wenn das Element nicht sichtbar ist (opacity oder visibility)
      if (window.getComputedStyle(element).opacity === '0' || 
          window.getComputedStyle(element).visibility === 'hidden') {
        
        console.log('Element wird sichtbar gemacht:', element);
        
        // Verzögerungsklasse auslesen
        let delay = 0;
        if (element.classList.contains('delay-100')) delay = 100;
        else if (element.classList.contains('delay-200')) delay = 200;
        else if (element.classList.contains('delay-300')) delay = 300;
        else if (element.classList.contains('delay-400')) delay = 400;
        else if (element.classList.contains('delay-500')) delay = 500;
        
        // Element nach kurzer Verzögerung sichtbar machen
        setTimeout(function() {
          element.style.opacity = '1';
          element.style.transform = 'none';
          element.style.visibility = 'visible';
        }, delay);
      }
    });
    
    // Spezielles Fallback für die Servicecard mit Zoom-In-Effekt
    const zoomCards = document.querySelectorAll('.zoom-in');
    console.log('Gefundene Elemente mit zoom-in-Klasse:', zoomCards.length);
    
    zoomCards.forEach(function(card) {
      if (window.getComputedStyle(card).opacity === '0') {
        console.log('Zoom-Element wird sichtbar gemacht:', card);
        
        // Verzögerungsklasse auslesen
        let delay = 0;
        if (card.classList.contains('delay-100')) delay = 100;
        else if (card.classList.contains('delay-200')) delay = 200;
        else if (card.classList.contains('delay-300')) delay = 300;
        else if (card.classList.contains('delay-400')) delay = 400;
        else if (card.classList.contains('delay-500')) delay = 500;
        
        // Zoom-Element nach kurzer Verzögerung sichtbar machen
        setTimeout(function() {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.visibility = 'visible';
        }, delay);
      }
    });
  }, 1500); // 1.5 Sekunden warten, um dem IntersectionObserver Zeit zu geben
});
