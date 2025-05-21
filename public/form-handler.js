/**
 * Formspree Kontaktformular Verarbeitung
 */
document.addEventListener('DOMContentLoaded', function() {
  // Das Formular im DOM finden
  const form = document.getElementById('contact-form');
  const formResult = document.getElementById('form-result');
  
  // Nur fortfahren, wenn das Formular existiert
  if (form) {
    form.addEventListener('submit', function(event) {
      // Standardverhalten verhindern
      event.preventDefault();
      
      // Formular-Elemente deaktivieren während Übertragung
      const formElements = form.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }
      
      // "Wird gesendet" Nachricht anzeigen
      formResult.innerHTML = '<p class="sending">Nachricht wird gesendet...</p>';
      formResult.setAttribute('aria-hidden', 'false');
      formResult.style.display = 'block';
      
      // Formular-Daten für JSON-Übermittlung vorbereiten
      // Dies umgeht CORS-Probleme bei lokaler Entwicklung
      const jsonData = {};
      const formData = new FormData(form);
      
      // FormData in JSON konvertieren
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      
      // Daten an Formspree senden mit JSON-Format
      fetch(form.action, {
        method: form.method,
        body: JSON.stringify(jsonData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        // Auch im Fehlerfall die Antwort zurückgeben
        return response.json().then(data => {
          if (response.ok) {
            return data;
          } else {
            // Detaillierten Fehler werfen mit Antwortdaten
            throw {
              status: response.status,
              statusText: response.statusText,
              data: data
            };
          }
        });
      })
      .then(data => {
        // Erfolgreiche Übermittlung
        console.log('Erfolg:', data);
        formResult.innerHTML = '<p class="success">Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.</p>';
        form.reset(); // Formular zurücksetzen
      })
      .catch(error => {
        // Detailliertes Error Logging
        console.error('Fehlerdetails:', error);
        
        // Bei CORS-Fehler oder anderen Übermittlungsproblemen
        if (error.status === 400) {
          formResult.innerHTML = `<p class="error">Formular konnte nicht übermittelt werden. Bitte stellen Sie sicher, dass Ihr Formspree-Konto aktiviert ist.</p>`;
        } else {
          formResult.innerHTML = `<p class="error">Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.</p>`;
        }
      })
      .finally(() => {
        // Formular-Elemente wieder aktivieren
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = false;
        }
      });
    });
  }
});
