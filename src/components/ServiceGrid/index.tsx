import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types' 
import { getPayload } from 'payload'
import config from '@/payload.config'

export const ServiceGrid: React.FC = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'category', 
  })

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-brand-darkblue mb-4">
             Unsere <span className="text-brand-turquoise">Leistungen</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
             Maßgeschneiderte Lösungen für Ihren Kundenservice – skalierbar, professionell und persönlich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
             const iconUrl = typeof service.icon === 'object' && service.icon?.url ? service.icon.url : null
             
             return (
               <div key={service.id} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-start cursor-default">
                  {iconUrl && (
                    <div className="w-16 h-16 mb-6 rounded-xl bg-brand-lightgray flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                       <Image src={iconUrl} alt={service.title} width={64} height={64} className="object-contain" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-brand-darkblue mb-3 group-hover:text-brand-turquoise transition-colors">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
               </div>
             )
          })}
          
          {services.length === 0 && (
             <div className="col-span-full text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-xl">
               No services found. Please add some in the Admin Panel.
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
