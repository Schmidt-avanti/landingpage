'use server'

import { getPayloadClient } from '@/payloadClient'

export async function submitContactForm(prevState: any, formData: FormData) {
  const payload = await getPayloadClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const emailTo =
    process.env.CONTACT_FORM_TO ||
    (typeof (siteSettings as any)?.email === 'string'
      ? ((siteSettings as any).email as string)
      : '') ||
    'info@avanti.cx'

  // New Fields
  const company = formData.get('company') as string
  const position = formData.get('position') as string
  const phone = formData.get('phone') as string

  const errors: Record<string, string[]> = {}

  if (!name || name.trim().length === 0) errors.name = ['Name ist erforderlich']
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = ['Ungültige E-Mail-Adresse']
  // Message is no longer required for the "Request Quote" form style
  // Company/Phone/Position are optional based on standard logic, unless requested otherwise.

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: 'Bitte überprüfen Sie Ihre Eingaben.',
    }
  }

  try {
    await payload.create({
      collection: 'form-submissions',
      data: {
        name,
        email,
        message,
        company,
        position,
        phone,
        source: 'Contact Form',
      },
    })

    try {
      await payload.sendEmail({
        to: emailTo,
        subject: `Neue Kontaktanfrage: ${name}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #172D52;">Neue Nachricht von der Website</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Firma:</strong> ${company || '-'}</p>
            <p><strong>Position:</strong> ${position || '-'}</p>
            <p><strong>Telefon:</strong> ${phone || '-'}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            </div>
        `,
        replyTo: email,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // We still return success because the data was saved
    }

    return {
      success: true,
      message: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    }
  }
}
