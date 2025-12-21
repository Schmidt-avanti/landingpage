import type { Page } from '@/payload-types'
import { Media } from '@/payload-types'
import Image from 'next/image'

type VideoBlockType = Extract<Page['layout'][number], { blockType: 'videoBlock' }>

export const VideoBlockComponent: React.FC<VideoBlockType> = ({ headline, subheadline, videoUrl, thumbnail }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {headline && <h2 className="text-3xl md:text-4xl font-bold text-brand-darkblue mb-4">{headline}</h2>}
        {subheadline && <p className="text-brand-turquoise font-medium mb-12 uppercase tracking-wide">{subheadline}</p>}

        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group cursor-pointer">
            {/* Minimal implementation: Just Link to video or simple placeholder for now 
                Ideally this would play in a modal or replace thumbnail on click. 
                For MVP/Seed, a simple link/iframe if valid URL.
            */}
            
            {thumbnail && typeof thumbnail === 'object' && 'url' in thumbnail && (
                <Image 
                    src={thumbnail.url || ''} 
                    alt={thumbnail.alt || 'Video Thumbnail'}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
            )}
            
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </a>
            
            <div className="absolute bottom-6 left-6 text-white text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/50 px-3 py-1 rounded text-sm font-medium">Video ansehen</span>
            </div>
        </div>
      </div>
    </section>
  )
}
