import React from 'react'

type Addon = {
  id?: string | null
  name: string
  description?: string | null
  onetimePrice?: string | null
  monthlyPrice?: string | null
  note?: string | null
}

type Footnote = {
  id?: string | null
  text: string
}

type PricingAddonsProps = {
  headline?: string | null
  subheadline?: string | null
  addons?: Addon[] | null
  footnotes?: Footnote[] | null
  settings?: {
    theme?: 'light' | 'dark' | null
  } | null
}

export const PricingAddonsComponent: React.FC<PricingAddonsProps> = ({
  headline,
  subheadline,
  addons,
  footnotes,
  settings,
}) => {
  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-brand-darkblue' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {headline && (
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {subheadline}
            </p>
          )}
        </div>

        {/* Addons Table */}
        {addons && addons.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <th
                    className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    Option
                  </th>
                  <th
                    className={`hidden md:table-cell text-left py-4 px-4 font-semibold ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Beschreibung
                  </th>
                  <th
                    className={`text-right py-4 px-4 font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    Einmalig
                  </th>
                  <th
                    className={`text-right py-4 px-4 font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    Monatlich
                  </th>
                </tr>
              </thead>
              <tbody>
                {addons.map((addon, index) => (
                  <tr
                    key={addon.id || index}
                    className={`border-b transition-colors ${
                      isDark
                        ? 'border-white/5 hover:bg-white/5'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <td className={`py-4 px-4 ${isDark ? 'text-white' : 'text-brand-darkblue'}`}>
                      <span className="font-medium">{addon.name}</span>
                      {addon.note && (
                        <span
                          className={`block text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                        >
                          {addon.note}
                        </span>
                      )}
                    </td>
                    <td
                      className={`hidden md:table-cell py-4 px-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {addon.description || '–'}
                    </td>
                    <td
                      className={`py-4 px-4 text-right font-medium ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
                    >
                      {addon.onetimePrice || '–'}
                    </td>
                    <td
                      className={`py-4 px-4 text-right font-medium ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
                    >
                      {addon.monthlyPrice || '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footnotes */}
        {footnotes && footnotes.length > 0 && (
          <div className="max-w-4xl mx-auto text-center space-y-1">
            {footnotes.map((footnote, index) => (
              <p
                key={footnote.id || index}
                className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
              >
                {footnote.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
