'use client'

import {useEffect, useState} from 'react'
import {H4} from '~/UI/Typography'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const [showSkipButton, setShowSkipButton] = useState(false)

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

  return (
    isVisible && (
      <section data-section="loader" className="fixed grid place-items-center w-screen h-screen bg-[#000] z-[99999] overflow-hidden">
        <div className="w-full h-full">
          <video autoPlay loop muted playsInline className="block object-cover w-full h-full bg-gray-light/25" src="/loader/desktop.webm" />
        </div>

        {showSkipButton && (
          <button className="absolute px-10 pt-3 pb-4 text-white duration-200 rounded-md bottom-7 bg-blue/70 hover:bg-blue" onClick={() => setIsVisible(false)}>
            <H4 className="sm:text-lg">Пропустить видео</H4>
          </button>
        )}
      </section>
    )
  )
}
