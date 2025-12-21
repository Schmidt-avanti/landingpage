import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types' 
import { getPayload } from 'payload'
import config from '@/payload.config'

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1 text-brand-orange">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-200'}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export const Testimonials: React.FC = async () => {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    
    const { docs: testimonials } = await payload.find({
      collection: 'testimonials',
    })

    if (testimonials.length === 0) return null

    return (
      <section className="py-24 bg-brand-lightgray">
         <div className="container mx-auto px-4">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold font-poppins text-brand-darkblue mb-4">
                  Das sagen unsere <span className="text-brand-turquoise">Kunden</span>
               </h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => {
                   const avatarUrl = typeof t.avatar === 'object' && t.avatar?.url ? t.avatar.url : null
                   
                   return (
                     <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <StarRating rating={t.rating || 5} />
                        <blockquote className="mt-6 mb-8 text-gray-600 italic text-lg leading-relaxed">
                          "{t.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                           {avatarUrl ? (
                              <Image src={avatarUrl} alt={t.name} width={48} height={48} className="rounded-full object-cover w-12 h-12" />
                           ) : (
                              <div className="w-12 h-12 rounded-full bg-brand-turquoise/20 flex items-center justify-center text-brand-turquoise font-bold text-lg">
                                 {t.name.charAt(0)}
                              </div>
                           )}
                           <div>
                              <div className="font-bold text-brand-darkblue">{t.name}</div>
                              {t.company && <div className="text-sm text-gray-500">{t.company}</div>}
                           </div>
                        </div>
                     </div>
                   )
                })}
             </div>
         </div>
      </section>
    )
}
