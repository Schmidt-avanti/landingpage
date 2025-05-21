document.addEventListener('DOMContentLoaded', function() {
  // Bootstrap Logo Carousel Initialisierung
  var logoCarousel = document.getElementById('logoCarousel');
  if (logoCarousel) {
    try {
      // Bootstrap 5 Carousel aktivieren
      var carousel = new bootstrap.Carousel(logoCarousel, {
        interval: 3000,  // 3 Sekunden zwischen Slides
        wrap: true,      // Endlosschleife
        keyboard: false, // Keine Tastaturnavigation
        pause: false     // Kein Pausieren beim Hovern
      });
      
      console.log('Bootstrap Logo Carousel erfolgreich initialisiert');
    } catch (error) {
      console.error('Fehler bei der Initialisierung des Logo Carousels:', error);
    }
  }
});
