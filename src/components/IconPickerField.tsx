'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import { 
  Phone, Mail, MessageSquare, Calendar, Clock, User, Users, Headset, 
  Briefcase, FileText, Check, Star, Globe, ArrowRight, Zap, Shield, Smartphone, Monitor 
} from 'lucide-react'

const iconOptions = {
  Phone: { icon: Phone, label: 'Phone' },
  Mail: { icon: Mail, label: 'Mail' },
  MessageSquare: { icon: MessageSquare, label: 'Chat' },
  Calendar: { icon: Calendar, label: 'Calendar' },
  Clock: { icon: Clock, label: 'Time' },
  User: { icon: User, label: 'Person' },
  Users: { icon: Users, label: 'Team' },
  Headset: { icon: Headset, label: 'Support' },
  Briefcase: { icon: Briefcase, label: 'Business' },
  FileText: { icon: FileText, label: 'Doc' },
  Check: { icon: Check, label: 'Check' },
  Star: { icon: Star, label: 'Star' },
  Globe: { icon: Globe, label: 'World' },
  ArrowRight: { icon: ArrowRight, label: 'Arrow' },
  Zap: { icon: Zap, label: 'Flash' },
  Shield: { icon: Shield, label: 'Secure' },
  Smartphone: { icon: Smartphone, label: 'Mobile' },
  Monitor: { icon: Monitor, label: 'Screen' },
}

export const IconPickerField: React.FC = () => {
  const { value, setValue } = useField<string>({ path: 'selectedIcon' })

  return (
    <div className="field-type text">
      <label className="field-label">
        Visual Icon Selection
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px', marginTop: '10px' }}>
        {Object.entries(iconOptions).map(([key, { icon: Icon, label }]) => {
          const isSelected = value === key
          
          return (
            <button
              key={key}
              type="button"
              onClick={() => setValue(key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                border: isSelected ? '2px solid var(--theme-elevation-500)' : '1px solid var(--theme-elevation-150)',
                backgroundColor: isSelected ? 'var(--theme-elevation-100)' : 'var(--theme-elevation-0)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                 if (!isSelected) e.currentTarget.style.borderColor = 'var(--theme-elevation-400)'
              }}
              onMouseLeave={(e) => {
                 if (!isSelected) e.currentTarget.style.borderColor = 'var(--theme-elevation-150)'
              }}
            >
              <Icon size={24} strokeWidth={1.5} style={{ marginBottom: '8px', color: isSelected ? 'var(--theme-success-500)' : 'inherit' }} />
              <span style={{ fontSize: '11px', color: 'var(--theme-elevation-800)' }}>{label}</span>
            </button>
          )
        })}
      </div>
      {value && (
         <div style={{ marginTop: '10px' }}>
            <button 
                type="button" 
                onClick={() => setValue('')}
                style={{ fontSize: '12px', color: 'var(--theme-error-500)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
                Clear Selection
            </button>
         </div>
      )}
    </div>
  )
}
