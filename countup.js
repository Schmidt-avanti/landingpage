document.addEventListener('DOMContentLoaded', function() {
  // Alle Elemente mit der Klasse 'countup-number' auswählen
  const countElements = document.querySelectorAll('.countup-number');
  
  // IntersectionObserver erstellen für Scroll-basierte Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Animation nur starten, wenn Element sichtbar wird
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-target'), 10);
        
        // Animation bereits durchgeführt? (vermeidet mehrfaches Hochzählen)
        if (element.textContent === '0') {
          countUp(element, target);
        }
        
        // Element aus der Beobachtung entfernen
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.1 }); // Schon bei 10% Sichtbarkeit starten
  
  // Alle Zählelemente beobachten
  countElements.forEach(el => {
    observer.observe(el);
  });
  
  // Funktion zum Hochzählen der Zahlen
  function countUp(element, target) {
    // Geschwindigkeit anpassen je nach Zielwert
    const duration = 2000; // 2 Sekunden Dauer
    const steps = 60; // 60 Schritte (Framerate angepasst)
    const stepTime = duration / steps;
    
    let current = 0;
    const increment = target / steps;
    
    // Bei großen Zahlen Tausendertrennzeichen hinzufügen
    const formatNumber = (num) => {
      return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    
    const timer = setInterval(() => {
      current += increment;
      
      // Am Ende genau den Zielwert setzen
      if (current >= target) {
        clearInterval(timer);
        element.textContent = formatNumber(target);
      } else {
        element.textContent = formatNumber(current);
      }
    }, stepTime);
  }
});
