// Supabase-Konfiguration
const supabaseUrl = 'https://jdiffzezrmujwcqvligu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaWZmemV6cm11andjcXZsaWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjY4MjYsImV4cCI6MjA2MzM0MjgyNn0.kV7iTrlUJWkgvCuTeZixxRDMbovtz8LIwtFyF_bf7TM'

// Client erstellen
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey)

// Funktion zum Speichern von Kontaktanfragen
async function saveContactRequest(formData) {
  const { data, error } = await window.supabaseClient
    .from('contact_requests')
    .insert([
      { 
        name: formData.name,
        company: formData.company || null,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        privacy_policy: formData.privacy_policy === 'accepted',
        marketing_agreement: formData.marketing_agreement === 'accepted' || null
      }

    ])
    .select();
  
  if (error) {
    console.error('Fehler beim Speichern der Kontaktanfrage:', error)
    return { success: false, error }

  }

  
  // Hier können Sie die Edge Function für den E-Mail-Versand mit Resend aufrufen
  // Beispiel: await sendContactEmail(formData)
  
  return { success: true, data }
}
window.saveContactRequest = saveContactRequest;
