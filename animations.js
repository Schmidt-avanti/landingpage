document.addEventListener('DOMContentLoaded', function() {
  // IntersectionObserver für Scroll-basierte Animationen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Animation nur starten, wenn Element sichtbar wird
      if (entry.isIntersecting) {
        // Animation-Klasse hinzufügen
        entry.target.classList.add('fade-in');
        
        // Element aus der Beobachtung entfernen, damit Animation nur einmal erfolgt
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Schon bei 10% Sichtbarkeit starten
  
  // Alle zu animierenden Elemente beobachten
  document.querySelectorAll('.animate, .slide-in-left, .slide-in-right, .zoom-in').forEach(el => {
    observer.observe(el);
  });
});
