'use client'

import MuellerLogo from '$/logo.svg'
import {MenuIcon} from 'lucide-react'
import {X} from 'lucide-react'

import {PresentationData} from '~/Global/Header'
import {websitePaths} from '@/lib/constants'

import {useState, useEffect, useRef} from 'react'
import {usePathname} from 'next/navigation'
import {urlForFile} from '#/src/sanity/lib/file'
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'

import Image from 'next/image'
import Link from 'next/link'
import {H2, SPAN} from '~/UI/Typography'

function Button({href, target = '_blank', label}: {href: string; target?: '_self' | '_blank'; label: string}) {
  return (
    <Link href={href} target={target} className="grid w-full pt-3 pb-3.5 MENU_ITEM bg-blue place-items-center">
      <SPAN className="text-white sm:text-lg">{label}</SPAN>
    </Link>
  )
}

export function MobileHeader({presentationsData}: {presentationsData: PresentationData[]}) {
  const container = useRef<HTMLElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname()
  const isEuroclear = pathname.includes('euroclear')

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
        <Link href="/" className="grid w-56 pl-3 place-items-center" onClick={toggleMenu}>
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
            {Object.entries(websitePaths).map(([key, label]) => {
              const isMedia = key === 'media'
              const href = isMedia ? '/media' : `/#${key}`

              return (
                <Link href={href} className="w-fit MENU_ITEM" onClick={toggleMenu} key={key}>
                  <H2>{label}</H2>
                </Link>
              )
            })}
          </div>

          <div className="space-y-2 pb-14" onClick={toggleMenu}>
            {isEuroclear ? (
              presentationsData[1] && <Button href={urlForFile(presentationsData[1].presentation?.file?.asset?._ref || '')} label={presentationsData[1].presentation?.caption || ''} />
            ) : (
              <>
                {presentationsData[0] && <Button href={urlForFile(presentationsData[0].presentation?.file?.asset?._ref || '')} label={presentationsData[0].presentation?.caption || ''} />}
                <Button href="/euroclear" target="_self" label="Euroclear" />
              </>
            )}
          </div>
        </div>
      </section>
    </header>
  )
}
