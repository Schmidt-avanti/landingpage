/**
 * Mobile Menü Funktionalität
 * Optimiert für die neue Menüstruktur und maximale Klickbarkeit
 */
document.addEventListener('DOMContentLoaded', function() {
  // Basis-Elemente auswählen
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobileNav');
  const closeNav = document.getElementById('closeNav');
  const overlay = document.querySelector('.overlay');
  const menuLinks = document.querySelectorAll('.mobileNav .navLinks a');
  
  // Hamburger-Menü öffnen
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      openMenu();
    });
  }

  // Menü öffnen Funktion
  function openMenu() {
    mobileNav.classList.add('show');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Menü schließen Funktion
  function closeMenu() {
    mobileNav.classList.remove('show');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Schließen-Button Event-Listener
  if (closeNav) {
    closeNav.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
  }

  // Overlay Event-Listener
  if (overlay) {
    overlay.addEventListener('click', function() {
      closeMenu();
    });
  }
  
  // Alle Menülinks klickbar machen
  menuLinks.forEach(function(link) {
    // Event-Listener, der das Menü schließt und zum Ziel navigiert
    link.addEventListener('click', function() {
      closeMenu();
      // Kein preventDefault() hier, damit normale Links funktionieren
    });
  });

  // Auch die Telefonnummer im Menü einbinden
  const phoneLink = document.querySelector('.mobileNav .navButton a');
  if (phoneLink) {
    phoneLink.addEventListener('click', function() {
      // Bei Telefonnummern nicht das Menü schließen, nur wenn benötigt
      // closeMenu();
    });
  }
});
