// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Resend E-Mail API Client
// Siehe https://resend.com für API Key und Setup
import { Resend } from 'https://esm.sh/resend@3.2.0'

// Ändern Sie diesen API-Key zu Ihrem eigenen von resend.com
const RESEND_API_KEY = 'RESEND_API_KEY_HIER_EINFÜGEN';
const resend = new Resend(RESEND_API_KEY);

// E-Mail Empfänger und Absender konfigurieren
const EMAIL_TO = 'ihre-email@example.com'; // Empfänger-E-Mail
const EMAIL_FROM = 'kontakt@avanti.cx'; // Absender-E-Mail (verifizierte Domain in Resend)

Deno.serve(async (req) => {
  // CORS-Headers für Cross-Origin-Anfragen
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  try {
    // Daten aus der Anfrage extrahieren
    const { record } = await req.json();
    
    console.log('Kontaktanfrage erhalten:', record);

    // Formatieren der E-Mail
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: 'Neue Kontaktanfrage von der Avanti Website',
      html: `
        <h1>Neue Kontaktanfrage</h1>
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Firma:</strong> ${record.company || 'Nicht angegeben'}</p>
        <p><strong>E-Mail:</strong> ${record.email}</p>
        <p><strong>Telefon:</strong> ${record.phone}</p>
        <p><strong>Service:</strong> ${record.service}</p>
        <p><strong>Datenschutz akzeptiert:</strong> Ja</p>
        <p><strong>Marketing akzeptiert:</strong> ${record.marketing_agreement ? 'Ja' : 'Nein'}</p>
        <p>Diese Anfrage wurde am ${new Date().toLocaleString('de-DE')} erstellt.</p>
      `
    });

    if (error) {
      console.error('Fehler beim E-Mail-Versand:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 500
      });
    }

    console.log('E-Mail erfolgreich gesendet:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      status: 200
    });
  } catch (error) {
    console.error('Unerwarteter Fehler:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    });
  }
});

/* Um lokal zu testen:

  1. Führen Sie `supabase start` aus
  2. Senden Sie eine HTTP-Anfrage:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-contact-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"record":{"name":"Max Mustermann","email":"test@example.com","phone":"123456789","service":"Service mit Büro-Öffnungszeiten"}}'

*/
