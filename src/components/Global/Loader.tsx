'use client'

import LogoMaxImage from '$/logo-max.svg'
import {VolumeOff, Volume2} from 'lucide-react'

import Cookies from 'js-cookie'
import gsap from 'gsap'
import {useEffect, useState, useRef} from 'react'
import {useMediaQuery} from '@/hooks/useMediaQuery'

import Image from 'next/image'
import {H4} from '~/UI/Typography'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true) // Default to true
  const [isFading, setIsFading] = useState(false)
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const loaderDuration = 1.5

  useEffect(() => {
    const hasSeenLoader = Cookies.get('hasSeenLoader')

    if (hasSeenLoader) {
      setTimeout(() => {
        setIsVisible(false)
      }, loaderDuration * 1000)
    } else {
      Cookies.set('hasSeenLoader', 'true', {expires: 1})
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      document.documentElement.classList.add('no-scroll')
    } else {
      document.documentElement.classList.remove('no-scroll')
    }
    return () => {
      document.documentElement.classList.remove('no-scroll')
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let tl: gsap.core.Timeline | null = gsap.timeline({
      onComplete: () => {
        setShowVideo(true)
      },
    })

    tl.to(
      {},
      {
        duration: loaderDuration,
        onUpdate: () => {
          const prog = Math.round(tl!.progress() * 100)
          setProgress(prog)
        },
      },
    )

    return () => {
      if (tl) {
        tl.kill()
        tl = null
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (showVideo && videoContainerRef.current) {
      let fadeInTl: gsap.core.Timeline | null = gsap.timeline()

      fadeInTl.fromTo(
        videoContainerRef.current,
        {opacity: 0},
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              setShowSkipButton(true)
            }, 1000)
          },
        },
      )

      return () => {
        if (fadeInTl) {
          fadeInTl.kill()
          fadeInTl = null
        }
      }
    }
  }, [showVideo])

  const handleSkip = () => {
    setIsFading(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 315)
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const screenHeight = 'h-screen !h-svh'

  if (!isVisible) return null

  return (
    <section data-section="loader" className={`fixed w-screen ${screenHeight} bg-[#000] z-[99999] overflow-hidden duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {!showVideo ? (
        <div className="grid place-items-center h-full">
          <div className="flex flex-col items-end sm:mx-4 gap-5 sm:gap-3">
            <Image className="self-start xl:w-[40%] sm:w-[80%]" src={LogoMaxImage} alt="" />

            <div className="w-[95vw] sm:w-full h-[3px] bg-gray-600 bg-blue">
              <div className="h-full bg-white transition-all duration-300 ease-out" style={{width: `${progress}%`}} />
            </div>

            <span className="text-white text-4xl xl:text-3xl sm:text-xl">{progress}%</span>
          </div>
        </div>
      ) : (
        <div ref={videoContainerRef} className="grid w-full h-full opacity-0">
          <div className="w-full h-full aspect-video sm:aspect-[9/16] pointer-events-none">
            <video ref={videoRef} autoPlay loop muted={isMuted} playsInline className="block object-cover w-full h-full bg-gray-light/25">
              <source src={isDesktop ? '/loader/desktop.webm' : '/loader/mobile.webm'} type="video/webm" />
              <source src={isDesktop ? '/loader/desktop.mp4' : '/loader/mobile.mp4'} type="video/mp4" />
            </video>
          </div>

          {showSkipButton && (
            <button className="block absolute place-self-center px-10 xl:px-8 pt-3 pb-4 text-white duration-200 rounded-md sm:py-3 sm:px-7 bottom-7 bg-blue/85 hover:bg-blue" onClick={handleSkip}>
              <H4 className="sm:text-lg">Пропустить видео</H4>
            </button>
          )}

          <button onClick={handleMuteToggle} className="absolute top-6 right-6 sm:top-4 sm:right-4 bg-white text-blue py-2 px-2.5 rounded-md">
            {isMuted ? <VolumeOff className="s-8 xl:s-6" strokeWidth={1.5} /> : <Volume2 className="s-8 xl:s-6" strokeWidth={1.5} />}
          </button>
        </div>
      )}
    </section>
  )
}
