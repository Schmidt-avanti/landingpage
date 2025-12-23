'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X } from 'lucide-react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type AwardBadgeModalProps = {
  imageUrl: string
  title: string
  description?: SerializedEditorState | null
  size?: 'small' | 'large'
}

// Confetti particle component
const ConfettiParticle: React.FC<{ delay: number; left: number }> = ({ delay, left }) => {
  const colors = ['#FF6B35', '#00B4D8', '#FFD700', '#4ECDC4', '#FF69B4', '#9B59B6']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const size = Math.random() * 8 + 4
  const rotation = Math.random() * 360

  return (
    <div
      className="absolute animate-confetti pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10px',
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${delay}ms`,
        borderRadius: '2px',
      }}
    />
  )
}

// Modal content component
const ModalContent: React.FC<{
  imageUrl: string
  title: string
  description?: SerializedEditorState | null
  showConfetti: boolean
  confettiParticles: { id: number; delay: number; left: number }[]
  onClose: () => void
}> = ({ imageUrl, title, description, showConfetti, confettiParticles, onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-brand-darkblue/70 backdrop-blur-lg" />

      {/* Confetti Container */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiParticles.map((particle) => (
            <ConfettiParticle key={particle.id} delay={particle.delay} left={particle.left} />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Schließen"
        >
          <X size={24} className="text-gray-500" />
        </button>

        {/* Header with Badge - Centered */}
        <div className="flex flex-col items-center pt-8 pb-8 px-6 border-b border-gray-100">
          <div className="w-36 h-44 mb-8 flex items-center justify-center">
            <Image src={imageUrl} alt={title} width={144} height={176} className="object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-brand-darkblue font-poppins text-center">
            {title}
          </h2>
        </div>

        {/* Content with RichText - More padding */}
        {description && (
          <div className="p-8 payload-richtext text-gray-700">
            <LexicalRichText data={description} />
          </div>
        )}
      </div>
    </div>
  )
}

export const AwardBadgeModal: React.FC<AwardBadgeModalProps> = ({
  imageUrl,
  title,
  description,
  size = 'small',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 500,
    left: Math.random() * 100,
  }))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const isLarge = size === 'large'

  return (
    <>
      {/* Badge Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer transition-transform duration-200 hover:scale-110 focus:outline-none flex items-center justify-center ${
          isLarge ? 'h-20 w-20' : 'h-10 w-10'
        }`}
        aria-label={`Award: ${title}`}
      >
        <Image
          src={imageUrl}
          alt={title}
          width={isLarge ? 80 : 40}
          height={isLarge ? 80 : 40}
          className={`object-contain ${isLarge ? 'max-h-20' : 'max-h-10'}`}
        />
      </button>

      {/* Modal rendered via Portal to document.body */}
      {mounted &&
        isOpen &&
        createPortal(
          <ModalContent
            imageUrl={imageUrl}
            title={title}
            description={description}
            showConfetti={showConfetti}
            confettiParticles={confettiParticles}
            onClose={() => setIsOpen(false)}
          />,
          document.body,
        )}
    </>
  )
}
