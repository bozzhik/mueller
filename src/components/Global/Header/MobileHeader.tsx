'use client'

import MuellerLogo from '$/logo.svg'
import {MenuIcon} from 'lucide-react'
import {X} from 'lucide-react'

import {useState, useEffect, useRef} from 'react'
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'

import {websitePaths} from '@/lib/constants'
import {hoverLinkStyles} from '~/Global/Footer'

import Image from 'next/image'
import Link from 'next/link'
import {H2, SPAN} from '~/UI/Typography'
import {cn} from '#/src/lib/utils'

export function MobileHeader() {
  const container = useRef<HTMLElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  const tl = useRef<gsap.core.Timeline | null>(null)
  useGSAP(
    () => {
      gsap.set('.MENU_ITEM', {y: 75})

      tl.current = gsap
        .timeline({paused: true})
        .to('.MENU_OVERLAY', {
          duration: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.MENU_ITEM', {
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power4.out',
          delay: -0.7,
        })
    },
    {scope: container},
  )

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play()
      } else {
        tl.current.reverse()
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="hidden sm:block fixed w-full z-[99]">
      <div className="relative z-[999] flex items-center justify-between bg-white border-b border-gray">
        <Link href="/" className="grid w-56 pl-3 place-items-center">
          <Image src={MuellerLogo} className="object-contain w-full h-full" alt="Mueller Wagner logo" />
        </Link>

        <div className="p-3 text-white bg-blue" onClick={toggleMenu}>
          {isMenuOpen ? (
            <div className="flex items-center gap-2">
              <X />
            </div>
          ) : (
            <MenuIcon />
          )}
        </div>
      </div>

      <section ref={container} className={`absolute inset-0 z-20 w-screen h-screen ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className="flex flex-col justify-between h-full px-4 bg-white pb-14 MENU_OVERLAY pt-28 text-background">
          <div className="flex flex-col gap-3.5">
            {Object.entries(websitePaths).map(([key, label]) => (
              <Link href={`/#${key}`} className={cn(hoverLinkStyles, 'w-fit MENU_ITEM')} onClick={toggleMenu} key={key}>
                <H2>{label}</H2>
              </Link>
            ))}
          </div>

          <Link href="presentation.pdf" target="_blank" className="grid w-full pt-3 pb-3.5 MENU_ITEM bg-blue place-items-center">
            <SPAN className="text-white sm:text-lg">Скачать презентацию</SPAN>
          </Link>
        </div>
      </section>
    </header>
  )
}
