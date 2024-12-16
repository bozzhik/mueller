'use client'

import LogoMaxImage from '$/logo-max.svg'
import {VolumeOff, Volume2} from 'lucide-react'

import gsap from 'gsap'
import {useEffect, useState, useRef} from 'react'
import {useMediaQuery} from '@/hooks/useMediaQuery'

import Image from 'next/image'
import {H4} from '~/UI/Typography'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isVideoHidden, setIsVideoHidden] = useState(false)
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const stripeRefs = useRef<(HTMLDivElement | null)[]>([])

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const loaderDuration = 1.5

  useEffect(() => {
    if (isVideoHidden) {
      stripeRefs.current.forEach((stripe, index) => {
        if (stripe) {
          gsap.to(stripe, {
            height: '0%',
            duration: 0.3,
            delay: index * 0.15,
            ease: 'power2.out',

            onComplete: () => {
              setTimeout(() => {
                setIsVisible(false)
              }, 1000)
            },
          })
        }
      })
    }
  }, [isVideoHidden])

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
        {opacity: 1},
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
    if (videoContainerRef.current) {
      gsap.to(videoContainerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setIsVideoHidden(true)
        },
      })
    }
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
    <section data-section="loader" className={`fixed w-screen z-[99999] overflow-hidden ${screenHeight}`}>
      {!showVideo ? (
        <div className="grid place-items-center h-full bg-[#000]">
          <div className="flex flex-col items-end gap-5 sm:mx-4 sm:gap-3">
            <Image className="self-start xl:w-[40%] sm:w-[80%]" src={LogoMaxImage} alt="" />

            <div className="w-[95vw] sm:w-full h-[3px] bg-gray-600 bg-blue">
              <div className="h-full transition-all duration-300 ease-out bg-white" style={{width: `${progress}%`}} />
            </div>

            <span className="text-4xl text-white xl:text-3xl sm:text-xl">{progress}%</span>
          </div>
        </div>
      ) : (
        <>
          {!isVideoHidden && (
            <div className="grid w-full h-full opacity-100 duration-300 bg-blue">
              <div ref={videoContainerRef} className="w-full h-full aspect-video sm:aspect-[9/16] pointer-events-none">
                <video ref={videoRef} autoPlay loop muted={isMuted} playsInline className="block object-cover w-full h-full bg-gray-light/25">
                  <source src={isDesktop ? '/loader/desktop.webm' : '/loader/mobile.webm'} type="video/webm" />
                  <source src={isDesktop ? '/loader/desktop.mp4' : '/loader/mobile.mp4'} type="video/mp4" />
                </video>
              </div>

              {showSkipButton && (
                <button className="absolute block px-10 pt-3 pb-4 text-white duration-200 rounded-md place-self-center xl:px-8 sm:py-3 sm:px-7 bottom-7 bg-blue/85 hover:bg-blue" onClick={handleSkip}>
                  <H4 className="sm:text-lg">Пропустить видео</H4>
                </button>
              )}

              <button onClick={handleMuteToggle} className="absolute top-6 right-6 sm:top-4 sm:right-4 bg-white text-blue py-2 px-2.5 rounded-md">
                {isMuted ? <VolumeOff className="s-8 xl:s-6" strokeWidth={1.5} /> : <Volume2 className="s-8 xl:s-6" strokeWidth={1.5} />}
              </button>
            </div>
          )}

          {isVideoHidden && (
            <div className="absolute inset-0 grid grid-cols-5 z-[999]">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-blue h-full"
                  ref={(el) => {
                    stripeRefs.current[index] = el
                  }}
                ></div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
