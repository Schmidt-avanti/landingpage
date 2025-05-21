document.addEventListener('DOMContentLoaded', function() {
  // IntersectionObserver für Animationen konfigurieren
  const options = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Elemente werden etwas früher animiert
    threshold: 0.1
  };

  // Observer erstellen
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate'); // Animationsklasse hinzufügen
        observer.unobserve(entry.target); // Element nicht mehr beobachten
      }
    });
  }, options);

  // Alle Karten im "Wir sind für dich da"-Bereich finden
  const serviceSection = document.querySelector('section.bg-white.position-relative.pt-5');
  
  if (serviceSection) {
    // Alle Karten in der Sektion finden
    const cards = serviceSection.querySelectorAll('.card');
    
    // Jeder Karte die Animation-Basis-Klasse und eine Verzögerung zuweisen
    cards.forEach((card, index) => {
      // Animation-Basis-Klasse hinzufügen
      card.classList.add('card-animate');
      
      // Verzögerungsklasse basierend auf Index hinzufügen
      // Wir möchten eine Staffelung der Karten
      const delayIndex = index % 20; // Max 20 Verzögerungsstufen
      card.classList.add(`delay-${delayIndex}`);
      
      // Karte beobachten
      observer.observe(card);
      
      console.log(`Karte ${index+1} wird mit Verzögerung ${delayIndex} animiert`);
    });
    
    console.log(`${cards.length} Karten für Animation konfiguriert`);
  } else {
    console.warn('Service-Sektion wurde nicht gefunden!');
  }
});
