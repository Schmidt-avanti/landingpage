import type { CollectionConfig } from 'payload'

export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: {
    singular: 'Industry (Branche)',
    plural: 'Industries (Branchen)',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'selectedIcon', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // === BASIC INFO ===
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Industry Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-freundlicher Name (z.B. "immobilien", "e-commerce")',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Branchen-Typ',
      required: true,
      defaultValue: 'additional',
      options: [
        { label: 'Focus-Branche (große Darstellung)', value: 'focus' },
        { label: 'Weitere Branche (kompakte Liste)', value: 'additional' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Focus-Branchen werden prominent auf der Homepage dargestellt',
      },
    },
    {
      name: 'selectedIcon',
      type: 'select',
      label: 'Icon (Lucide)',
      admin: {
        description: 'Select a standard icon from the list',
      },
      options: [
        // Branchen
        { label: '🏠 Home (Immobilien)', value: 'Home' },
        { label: '🛒 ShoppingCart (E-Commerce)', value: 'ShoppingCart' },
        { label: '🚗 Car (Autohäuser)', value: 'Car' },
        { label: '🏪 Store (Handel)', value: 'Store' },
        { label: '❤️ Heart (Pflegedienste)', value: 'Heart' },
        { label: '🩺 Stethoscope (Praxen)', value: 'Stethoscope' },
        { label: '⚖️ Scale (Kanzleien)', value: 'Scale' },
        { label: '🍴 Utensils (Gastronomie)', value: 'Utensils' },
        { label: '🔨 Hammer (Handwerk)', value: 'Hammer' },
        { label: '🏛️ Building2 (Gemeinden)', value: 'Building2' },
        { label: '🛋️ Armchair (Einrichtungshäuser)', value: 'Armchair' },
        { label: '🛡️ Shield (Versicherungen)', value: 'Shield' },
        { label: '🏨 Hotel (Hotellerie)', value: 'Hotel' },
        { label: '🏢 Building (Unternehmen)', value: 'Building' },
        { label: '🏭 Factory (Industrie)', value: 'Factory' },
        { label: '📦 Package (Logistik)', value: 'Package' },
        { label: '💼 Briefcase (Beratung)', value: 'Briefcase' },
        { label: '🎓 GraduationCap (Bildung)', value: 'GraduationCap' },
        // Neue Icons
        { label: '📞 PhoneCall (Anrufe)', value: 'PhoneCall' },
        { label: '🔧 Wrench (Werkzeug)', value: 'Wrench' },
        { label: '✅ UserCheck (Benutzer bestätigt)', value: 'UserCheck' },
        { label: '📈 TrendingUp (Wachstum)', value: 'TrendingUp' },
        { label: '🔄 RefreshCw (Aktualisieren)', value: 'RefreshCw' },
        { label: '💳 CreditCard (Zahlung)', value: 'CreditCard' },
        { label: '👥 Users (Benutzer)', value: 'Users' },
        { label: '⏱️ Gauge (Tempo)', value: 'Gauge' },
        { label: '🔍 Filter (Filter)', value: 'Filter' },
        { label: '📋 ClipboardList (Checkliste)', value: 'ClipboardList' },
        { label: '💬 MessageSquare (Nachricht)', value: 'MessageSquare' },
        { label: '🗄️ Database (Datenbank)', value: 'Database' },
        { label: '📲 PhoneForwarded (Weiterleitung)', value: 'PhoneForwarded' },
        { label: '😊 Smile (Zufriedenheit)', value: 'Smile' },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Custom Icon (optional)',
      admin: {
        description: "Upload a custom icon image if you don't want to use a standard icon",
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      admin: {
        description: 'Kurze Beschreibung für Übersichtskarten (1-2 Sätze)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
    },

    // === DETAIL PAGE CONTENT ===
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Detail-Seite Inhalt',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero-Bild',
              admin: {
                description: 'Großes Bild für die Branchen-Detail-Seite',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Ausführlicher Inhalt',
              admin: {
                description: 'Detaillierte Beschreibung der Branchenlösung',
              },
            },
            {
              name: 'benefits',
              type: 'array',
              label: 'Vorteile / Features',
              admin: {
                description: 'Liste der Vorteile für diese Branche',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Titel',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Beschreibung',
                },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icon (optional)',
                  options: [
                    { label: '✓ Check', value: 'Check' },
                    { label: '⭐ Star', value: 'Star' },
                    { label: '⚡ Zap', value: 'Zap' },
                    { label: '🛡️ Shield', value: 'Shield' },
                    { label: '📞 Phone', value: 'Phone' },
                    { label: '💬 MessageSquare', value: 'MessageSquare' },
                    { label: '📅 Calendar', value: 'Calendar' },
                    { label: '🕐 Clock', value: 'Clock' },
                    { label: '📞 PhoneCall', value: 'PhoneCall' },
                    { label: '🔧 Wrench', value: 'Wrench' },
                    { label: '✅ UserCheck', value: 'UserCheck' },
                    { label: '📈 TrendingUp', value: 'TrendingUp' },
                    { label: '🔄 RefreshCw', value: 'RefreshCw' },
                    { label: '💳 CreditCard', value: 'CreditCard' },
                    { label: '⏱️ Gauge', value: 'Gauge' },
                    { label: '🔍 Filter', value: 'Filter' },
                    { label: '📋 ClipboardList', value: 'ClipboardList' },
                    { label: '🗄️ Database', value: 'Database' },
                    { label: '📲 PhoneForwarded', value: 'PhoneForwarded' },
                    { label: '😊 Smile', value: 'Smile' },
                    { label: '👥 Users', value: 'Users' },
                    { label: '🎧 Headset', value: 'Headset' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: {
                description: 'Überschreibt den Standard-Titel für Suchmaschinen',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                description: 'Beschreibung für Suchmaschinen (max. 160 Zeichen)',
              },
            },
          ],
        },
      ],
    },
  ],
}
