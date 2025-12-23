import type { Page } from '@/payload-types'
import { Media } from '@/payload-types'
import Image from 'next/image'

type VideoBlockType = Extract<Page['layout'][number], { blockType: 'videoBlock' }>

export const VideoBlockComponent: React.FC<
  VideoBlockType & { settings?: { theme?: 'light' | 'dark' } }
> = ({
  headline,
  subheadline,
  videoFile, // Keep videoFile as it's part of VideoBlockType
  thumbnail, // Keep thumbnail as it's part of VideoBlockType
  settings,
}) => {
  const video = videoFile as Media
  const thumb = thumbnail as Media

  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'
  const textClasses = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section className={`py-24 ${containerClasses}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {headline && <h2 className="text-3xl md:text-5xl font-bold mb-6">{headline}</h2>}
          {subheadline && <p className={`text-xl leading-relaxed ${textClasses}`}>{subheadline}</p>}
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black">
          {video?.url ? (
            <video
              controls
              className="w-full h-auto aspect-video"
              poster={thumb?.url || undefined}
              playsInline
            >
              <source src={video.url} type={video.mimeType || 'video/mp4'} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center h-64 text-white">
              No video selected
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
