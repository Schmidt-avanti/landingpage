document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header.sticky-header');
  const scrollThreshold = 50; // Ab 50px Scroll wird der Header farbig

  // Funktion zum Prüfen der Scroll-Position
  function checkScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Initial prüfen (falls die Seite bereits gescrollt geladen wird)
  checkScroll();

  // Event-Listener für das Scroll-Event
  window.addEventListener('scroll', checkScroll);
});
