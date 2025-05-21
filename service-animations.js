document.addEventListener('DOMContentLoaded', function() {
  console.log('Service Animations initialisiert');
  
  // Animation sofort starten - nicht auf Intersection warten
  const initServiceAnimations = function() {
    // Alle Service-Karten direkt auswählen
    const serviceSection = document.getElementById('serviceSection');
    if (!serviceSection) {
      console.error('Service-Section nicht gefunden');
      return;
    }
    
    // Alle Karten im Service-Bereich finden
    let allCards = Array.from(serviceSection.querySelectorAll('.showCardContainer'));
    console.log(`${allCards.length} Service-Karten gefunden`);
    
    // Sicherstellen, dass wir wirklich alle Karten haben
    if (allCards.length === 0) {
      // Alternatives Auswahlverfahren, falls die normale Selektion fehlschlägt
      const cols = serviceSection.querySelectorAll('.col-xxl-3');
      allCards = Array.from(cols).map(col => col.querySelector('.showCardContainer')).filter(Boolean);
      console.log(`Alternative Selektion: ${allCards.length} Karten gefunden`);
    }
    
    // Wenn immer noch keine Karten gefunden wurden, frühzeitig beenden
    if (allCards.length === 0) {
      console.error('Keine Service-Karten gefunden');
      return;
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

    // Animationen direkt anwenden und Elemente sofort sichtbar machen
    allCards.forEach((card, index) => {
      if (!card) return; // Sicherheitscheck
      
      const animType = animationTypes[index % animationTypes.length] || 'zoom-in';
      const delay = delays[index % delays.length] || '400';
      
      // Statt Klassen hinzuzufügen, direkt die Stile setzen
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        
        // Animation basierend auf dem Typ anwenden
        if (animType === 'zoom-in') {
          card.style.transform = 'scale(1)';
        } else if (animType === 'slide-in-left') {
          card.style.transform = 'translateX(0)';
        } else if (animType === 'slide-in-right') {
          card.style.transform = 'translateX(0)';
        }
        
        card.classList.add('fade-in'); // Markierung, dass Animation angewendet wurde
      }, parseInt(delay));
      
      console.log(`Karte ${index+1} mit Animation ${animType} und Verzögerung ${delay}ms konfiguriert`);
    });
  };
  
  // Animation sofort starten
  initServiceAnimations();
  
  // Zusätzlich: Wiederholter Versuch nach 1 Sekunde, falls Karten erst später geladen werden
  setTimeout(initServiceAnimations, 1000);

  // Den blauen Bereich (Weitere Serviceleistungen) animieren - mit direkter Animation
  const animateBlueSection = function() {
    const blueSection = document.querySelector('.bg-main');
    if (blueSection) {
      // Alle Icon-Container im blauen Bereich auswählen
      const blueIcons = blueSection.querySelectorAll('.iconContainer');
      console.log(`${blueIcons.length} Icons im blauen Bereich gefunden`);
      
      // Wenn keine Icons gefunden wurden, frühzeitig beenden
      if (blueIcons.length === 0) {
        console.error('Keine Icons im blauen Bereich gefunden');
        return;
      }
      
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
      
      // Animationen direkt anwenden und Elemente sofort sichtbar machen
      blueIcons.forEach((icon, index) => {
        if (!icon) return; // Sicherheitscheck
        
        const animType = iconAnimations[index % iconAnimations.length] || 'zoom-in';
        const delay = iconDelays[index % iconDelays.length] || '400';
        
        // Statt Klassen hinzuzufügen, direkt die Stile setzen
        setTimeout(() => {
          icon.style.opacity = '1';
          icon.style.visibility = 'visible';
          
          // Animation basierend auf dem Typ anwenden
          if (animType === 'zoom-in') {
            icon.style.transform = 'scale(1)';
          } else if (animType === 'slide-in-left') {
            icon.style.transform = 'translateX(0)';
          } else if (animType === 'slide-in-right') {
            icon.style.transform = 'translateX(0)';
          }
          
          icon.classList.add('fade-in'); // Markierung, dass Animation angewendet wurde
        }, parseInt(delay));
        
        console.log(`Blaues Icon ${index+1} mit Animation ${animType} und Verzögerung ${delay}ms konfiguriert`);
      });
    }
  };
  
  // Animation des blauen Bereichs sofort starten
  animateBlueSection();
  
  // Zusätzlich: Wiederholter Versuch nach 1,5 Sekunden
  setTimeout(animateBlueSection, 1500);
});
