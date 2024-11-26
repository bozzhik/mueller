'use client'

import {useEffect, useState} from 'react'
import {useMediaQuery} from '@/hooks/useMediaQuery'

import {H4} from '~/UI/Typography'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false) // Track fading animation
  const [showSkipButton, setShowSkipButton] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isVisible])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipButton(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSkip = () => {
    setIsFading(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 315)
  }

  return (
    isVisible && (
      <section data-section="loader" className={`fixed grid place-items-center w-screen h-screen bg-[#000] z-[99999] overflow-hidden duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full h-full">
          <video autoPlay loop muted playsInline className="block object-cover w-full h-full bg-gray-light/25" src={isDesktop ? '/loader/desktop.webm' : '/loader/mobile.webm'} />
        </div>

        {showSkipButton && (
          <button className="absolute px-10 pt-3 pb-4 text-white duration-200 rounded-md sm:py-3 sm:px-7 bottom-7 bg-blue/85 hover:bg-blue" onClick={handleSkip}>
            <H4 className="sm:text-lg">Пропустить видео</H4>
          </button>
        )}
      </section>
    )
  )
}
