// Einfache, robuste CountUp-Animation
(function() {
  // Warte auf DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[COUNTUP] Skript geladen');
    
    // Finde alle .countup-number Elemente
    const elements = document.querySelectorAll('.countup-number');
    console.log('[COUNTUP] Gefundene Elemente:', elements.length);
    
    // Wenn keine Elemente gefunden wurden, gibt es nichts zu tun
    if (elements.length === 0) return;
    
    // Funktion zum Animieren eines Elements
    function animateElement(element, target) {
      // Animation-Parameter
      const duration = 2000; // 2 Sekunden
      const fps = 60;
      const frames = duration / 1000 * fps;
      const increment = target / frames;
      
      // Starte von 0
      let current = 0;
      
      // Formatierungsfunktion (deutsche Formatierung mit Punkten)
      function formatNumber(num) {
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      
      // Animation mittels setInterval
      const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
          // Animation abgeschlossen
          clearInterval(timer);
          element.textContent = formatNumber(target);
        } else {
          // Aktueller Zwischenstand
          element.textContent = formatNumber(Math.round(current));
        }
      }, 1000 / fps);
    }
    
    // WICHTIG: Setze alle Zahlen initial auf 0
    elements.forEach(el => {
      el.textContent = '0';
    });
    
    // Initialisiere den IntersectionObserver mit strengeren Einstellungen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('[COUNTUP] Element geprüft:', entry.target, 'Sichtbar:', entry.isIntersecting);
        
        // Wenn Element sichtbar wird und noch nicht animiert wurde
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          // Hole Zielwert vom data-attribute
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          if (isNaN(target)) return;
          
          console.log('[COUNTUP] Starte Animation für Element:', entry.target);
          
          // Markiere als animiert, damit es nicht mehrfach animiert wird
          entry.target.classList.add('counted');
          
          // Animation starten
          animateElement(entry.target, target);
          
          // Beobachtung beenden
          observer.unobserve(entry.target);
        }
      });
    }, {
      // Sehr streng: Element muss zu mindestens 30% sichtbar sein
      threshold: 0.3,
      // Kein Margin, damit die Animation wirklich erst beim Scrollen startet
      rootMargin: "0px"
    });
    
    // Beobachtung nach einer minimalen Verzögerung starten
    // Dies vermeidet, dass Elemente, die initial sichtbar sind, sofort animiert werden
    setTimeout(() => {
      elements.forEach(el => {
        observer.observe(el);
      });
    }, 500);
    
    // FALLBACK: Nach längerer Zeit prüfen, ob es nicht-animierte Elemente gibt,
    // die möglicherweise vom Observer übersehen wurden
    setTimeout(() => {
      elements.forEach(el => {
        if (!el.classList.contains('counted')) {
          // Nur animieren, wenn das Element tatsächlich sichtbar ist
          const rect = el.getBoundingClientRect();
          const isVisible = rect.bottom > 0 && 
                           rect.right > 0 && 
                           rect.top < window.innerHeight && 
                           rect.left < window.innerWidth;
          
          if (isVisible) {
            console.log('[COUNTUP] Fallback-Animation für sichtbares Element:', el);
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              el.classList.add('counted');
              animateElement(el, target);
            }
          }
        }
      });
    }, 3000);
  });
})();
