/**
 * Predefined anchor IDs for in-page navigation.
 * Used in both blockSettings (to assign an anchor) and SiteSettings navigation (to link to it).
 */
export const anchorOptions = [
  { label: 'Kontaktformular', value: 'contact-form' },
  { label: 'Leistungen', value: 'services' },
  { label: 'Kundenstimmen', value: 'testimonials' },
  { label: 'Video', value: 'video' },
  { label: 'Branchen', value: 'industries' },
  { label: 'Suite', value: 'suite' },
] as const

export type AnchorId = (typeof anchorOptions)[number]['value']
