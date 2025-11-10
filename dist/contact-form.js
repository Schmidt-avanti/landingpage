

// Supabase Edge Function für E-Mail-Versand
const EDGE_FUNCTION_URL = 'https://jdiffzezrmujwcqvligu.supabase.co/functions/v1/Resend';
// Der anonyme API-Schlüssel für die Authentifizierung
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaWZmemV6cm11andjcXZsaWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjY4MjYsImV4cCI6MjA2MzM0MjgyNn0.kV7iTrlUJWkgvCuTeZixxRDMbovtz8LIwtFyF_bf7TM';

// Funktion zum Senden von E-Mails über die Supabase Edge Function
async function sendEmailViaEdgeFunction(contactData) {
  try {
    // Hier rufen wir die Supabase Edge Function auf
    // Diese kümmert sich um den Versand der E-Mail über Resend
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Edge Function Fehler:', response.status, errorText);
      return { success: false, error: { message: `Status ${response.status}: ${errorText || 'Unbekannter Fehler'}` } };
    }
    
    const result = await response.json();
    console.log('Edge Function Antwort:', result);
    
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      console.error('Edge Function Error:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('E-Mail-Versand fehlgeschlagen:', error);
    return { success: false, error };
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const formResult = document.getElementById('form-result');
  
  if (!formResult) {
    // Falls formResult nicht existiert, erstellen wir es
    const resultDiv = document.createElement('div');
    resultDiv.id = 'form-result';
    resultDiv.setAttribute('aria-hidden', 'true');
    resultDiv.style.display = 'none';
    form.insertAdjacentElement('afterend', resultDiv);
  }
  
  if (form) {
    form.addEventListener('submit', async function(event) {
      // Standardverhalten verhindern
      event.preventDefault();
      
      // Formular-Elemente deaktivieren während Übertragung
      const formElements = form.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }
      
      // "Wird gesendet" Nachricht anzeigen
      const formResultElement = document.getElementById('form-result');
      formResultElement.innerHTML = '<p class="sending">Nachricht wird gesendet...</p>';
      formResultElement.setAttribute('aria-hidden', 'false');
      formResultElement.style.display = 'block';
      
      // Formular-Daten sammeln
      const formData = {
        name: form.querySelector('[name="name"]').value,
        company: form.querySelector('[name="company"]').value || null,
        email: form.querySelector('[name="email"]').value,
        phone: form.querySelector('[name="phone"]').value,
        
        privacy_policy: form.querySelector('[name="privacy_policy"]').checked ? 'accepted' : null,
        marketing_agreement: form.querySelector('[name="marketing_agreement"]').checked ? 'accepted' : null
      };
      
      try {
        // 1. Daten in Supabase speichern
        const dbResult = await saveContactRequest(formData);
        
        if (!dbResult.success) {
          throw new Error(`Datenbankfehler: ${dbResult.error.message || 'Unbekannter Fehler'}`);
        }
        
        // 2. E-Mail über Supabase Edge Function senden
        const emailResult = await sendEmailViaEdgeFunction(formData);
        
        if (!emailResult.success) {
          console.warn('E-Mail konnte nicht gesendet werden:', emailResult.error);
          // Wir werfen hier keinen Fehler, da die Daten bereits gespeichert wurden
          // Stattdessen zeigen wir eine teilweise Erfolgsmeldung an
          formResultElement.innerHTML = '<p class="partial-success">Ihre Anfrage wurde gespeichert, aber die Benachrichtigungs-E-Mail konnte nicht gesendet werden. Wir werden uns trotzdem mit Ihnen in Verbindung setzen.</p>';
        } else {
          // Voller Erfolg: Daten gespeichert und E-Mail gesendet
          formResultElement.innerHTML = '<p class="success">Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.</p>';
          form.reset(); // Formular zurücksetzen
        }
      } catch (error) {
        // Fehlerfall
        formResultElement.innerHTML = `<p class="error">Es ist ein Fehler aufgetreten: ${error.message || 'Unbekannter Fehler'}</p>`;
        console.error('Fehler bei der Formularverarbeitung:', error);
      } finally {
        // Formular-Elemente wieder aktivieren
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = false;
        }
      }
    });
  }
});
