document.addEventListener('DOMContentLoaded', function() {
  console.log('Service Animations initialisiert');
  
  // Alle Service-Karten direkt auswählen
  const serviceSection = document.getElementById('serviceSection');
  if (!serviceSection) {
    console.error('Service-Section nicht gefunden');
    return;
  }
  
  // Alle Karten im Service-Bereich finden
  const allCards = Array.from(serviceSection.querySelectorAll('.showCardContainer'));
  console.log(`${allCards.length} Service-Karten gefunden`);
  
  // Sicherstellen, dass wir wirklich alle Karten haben
  if (allCards.length === 0) {
    // Alternatives Auswahlverfahren, falls die normale Selektion fehlschlägt
    const cols = serviceSection.querySelectorAll('.col-xxl-3');
    cols.forEach(col => {
      const card = col.querySelector('.showCardContainer');
      if (card) allCards.push(card);
    });
    console.log(`Alternative Selektion: ${allCards.length} Karten gefunden`);
  }
  
  // Animationstypen definieren
  const animationTypes = [
    'zoom-in',
    'slide-in-left',
    'slide-in-right',
    'zoom-in',
    'slide-in-left',
    'slide-in-right',
    'zoom-in',
    'slide-in-left'
  ];
  
  // Verzögerungen für jede Karte festlegen
  const delays = [
    '200', '300', '400', '500',
    '300', '400', '500', '600'
  ];

  // Animationen für jede Karte einzeln hinzufügen
  allCards.forEach((card, index) => {
    const animType = animationTypes[index] || 'zoom-in';
    const delay = delays[index] || '400';
    
    // Alte Animationsklassen entfernen (falls vorhanden)
    card.classList.remove('animate', 'zoom-in', 'slide-in-left', 'slide-in-right');
    card.classList.remove('delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600');
    
    // Neue Klassen hinzufügen
    card.classList.add('animate');
    card.classList.add(animType);
    card.classList.add(`delay-${delay}`);
    
    console.log(`Karte ${index+1} mit Animation ${animType} und Verzögerung ${delay}ms konfiguriert`);
  });
  
  // IntersectionObserver für die Karten erstellen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        console.log('Animation einer Karte ausgelöst');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });  // rootMargin erhöht, um Animation früher auszulösen
  
  // Alle Karten beobachten
  allCards.forEach(card => {
    observer.observe(card);
  });

  // Den blauen Bereich (Weitere Serviceleistungen) animieren
  const blueSection = document.querySelector('.bg-main');
  if (blueSection) {
    // Alle Icon-Container im blauen Bereich auswählen
    const blueIcons = blueSection.querySelectorAll('.iconContainer');
    console.log(`${blueIcons.length} Icons im blauen Bereich gefunden`);
    
    // Animationstypen für die Icons
    const iconAnimations = [
      'zoom-in',      // 24h-Notfall-Hotline
      'slide-in-left', // Helpdesk
      'slide-in-right', // Beschwerde-Line
      'zoom-in',      // Vordienstleister koordinieren
      'slide-in-left', // Welcome Calls
      'slide-in-right', // Softe Mahnung
      'zoom-in'       // Rückrufe
    ];
    
    // Verzögerungen für die Icons
    const iconDelays = [
      '200', '300', '400', '500', '400', '500', '600'
    ];
    
    // Jedem Icon eine Animation zuweisen
    blueIcons.forEach((icon, index) => {
      // Alte Klassen entfernen
      icon.classList.remove('animate', 'zoom-in', 'slide-in-left', 'slide-in-right');
      icon.classList.remove('delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600');
      
      // Animation und Verzögerung bestimmen
      const animType = iconAnimations[index] || 'zoom-in';
      const delay = iconDelays[index] || '400';
      
      // Animationsklassen hinzufügen
      icon.classList.add('animate');
      icon.classList.add(animType);
      icon.classList.add(`delay-${delay}`);
      
      console.log(`Blaues Icon ${index+1} mit Animation ${animType} und Verzögerung ${delay}ms konfiguriert`);
      
      // Beobachten, damit Animation beim Scrollen ausgelöst wird
      observer.observe(icon);
      
      // Auch den Text unter dem Icon animieren
      const iconText = icon.querySelector('p');
      if (iconText) {
        iconText.classList.add('animate');
        iconText.classList.add('delay-' + (parseInt(delay) + 100));
        observer.observe(iconText);
      }
    });
  }
});
