'use client'

import TelegramLogo from '$/index/telegram.svg'
import TelegramInvertLogo from '$/index/telegram-invert.svg'

import {useRef} from 'react'

import Image from 'next/image'
import Link from 'next/link'
import {H2, H3, H6} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'

type Props = {
  caption: string
  title: string
  link: string
  actionText: string
  actionButtonText: string
}

export default function ActionModule({caption, title, link, actionText, actionButtonText}: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  return (
    <section id="blog" data-section="blog-index">
      <div data-section="desktop-blog-index" className="sm:hidden">
        <div className="w-full h-8 bg-blue"></div>

        <div className="grid grid-cols-4">
          <div className="self-end col-span-2 p-8 space-y-3">
            <H6>{caption}</H6>
            <H2 className="leading-[1.2]">{title}</H2>
          </div>

          <div></div>

          <Link href={link} className="flex flex-col justify-between gap-20 p-8 xl:gap-12 group border-l border-gray" target="_blank">
            <Image className="w-12 xl:w-10 group-hover:scale-[1.07] duration-300" src={TelegramLogo} alt="Телеграм канал Санкционный дозор" />

            <H3 className="leading-[1.1] border-b-2 border-transparent group-hover:border-foreground w-fit duration-300">{actionText}</H3>
          </Link>
        </div>

        <Link ref={linkRef} href={link} className="block pt-5 pb-3.5 text-center text-white bg-blue">
          <HoverText triggerRef={linkRef}>
            <H3 className="mx-auto leading-tight w-fit">{actionButtonText}</H3>
          </HoverText>
        </Link>
      </div>

      <div data-section="mobile-blog-index" className="hidden sm:block">
        <div className="w-full h-6 bg-blue"></div>

        <div className="px-3 py-8 pb-12 space-y-8 border-b border-gray">
          <div className="space-y-2">
            <H6>{caption}</H6>
            <H2 className="!leading-[1.2] pr-4">{title}</H2>
          </div>

          <div className="space-y-2">
            <Link href={link} className="flex items-center justify-center gap-2 py-3.5 text-white bg-blue" target="_blank">
              <Image className="w-7" src={TelegramInvertLogo} alt="Телеграм канал Санкционный дозор" />
              <H3 className="sm:text-lg">sanctionsexplained</H3>
            </Link>

            <Link href={link} className="flex items-center justify-center gap-2 py-3.5 text-white bg-blue">
              <H3 className="sm:text-lg">{actionButtonText}</H3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
