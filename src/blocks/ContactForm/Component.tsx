import type { Page } from '@/payload-types'

type ContactFormType = Extract<Page['layout'][number], { blockType: 'contactForm' }>

export const ContactFormComponent: React.FC<ContactFormType> = ({ headline, introText }) => {
  return (
    <section id="contact" className="py-24 bg-brand-darkblue text-white">
      <div className="container mx-auto px-4 max-w-4xl">
         <div className="text-center mb-12">
            {headline && <h2 className="text-3xl md:text-5xl font-bold mb-6">{headline}</h2>}
            {introText && <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">{introText}</p>}
         </div>

         <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                        <input type="text" id="name" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise transition-all" placeholder="Ihr Name" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">E-Mail</label>
                        <input type="email" id="email" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise transition-all" placeholder="ihre@email.de" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Nachricht</label>
                    <textarea id="message" rows={5} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise transition-all" placeholder="Wie können wir Ihnen helfen?"></textarea>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all">
                        Absenden
                    </button>
                    <p className="text-center text-gray-400 text-sm mt-4">
                        Mit dem Absenden stimmen Sie unserer <a href="#" className="underline hover:text-white">Datenschutzerklärung</a> zu.
                    </p>
                </div>
            </form>
         </div>
      </div>
    </section>
  )
}
