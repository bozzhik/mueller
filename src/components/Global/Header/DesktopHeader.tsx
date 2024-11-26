'use client'

import MuellerLogo from '$/logo.svg'
import {PRESENTATIONS_QUERYResult} from '#/sanity.types'
import {websitePaths} from '#/src/lib/constants'
import {hoverLinkStyles} from '~/Global/Footer'
import {urlForFile} from '#/src/sanity/lib/file'

import Link from 'next/link'
import Image from 'next/image'
import {SPAN} from '~/UI/Typography'

type PresentationData = {
  presentation: PRESENTATIONS_QUERYResult[number]
  name: string
}

interface DesktopHeaderProps {
  presentationsData: PresentationData[]
}

export function DesktopHeader({presentationsData}: DesktopHeaderProps) {
  return (
    <header className="sm:hidden fixed z-[99] w-full h-[9vh] flex justify-between bg-white border-b border-gray">
      <div className="flex gap-10 xl:gap-6">
        <Link href="/" className="grid px-8 xl:px-4 border-r place-items-center border-gray xl:w-[30%]">
          <Image src={MuellerLogo} className="object-contain" alt="Mueller Wagner logo" />
        </Link>

        <nav className="flex items-center justify-center gap-8 xl:gap-4 -mt-1.5 xl:-mt-0.5">
          {Object.entries(websitePaths).map(([key, label]) => {
            const isMedia = key === 'media'
            const href = isMedia ? '/media' : `/#${key}`

            return (
              <Link href={href} className={hoverLinkStyles} key={key}>
                <SPAN>{label}</SPAN>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex divide-x-[3px] divide-gray-light">
        {presentationsData.map(({presentation, name}) => (
          <Link key={name} href={urlForFile(presentation?.file?.asset?._ref || '')} target="_blank" className="grid px-10 xl:px-7 text-white bg-blue duration-500 hover:bg-blue/95 place-items-center -mt-1.5 xl:-mt-0.5">
            <SPAN className="block pb-1 text-2xl normal-case text-nowrap">{presentation?.caption}</SPAN>
          </Link>
        ))}
      </div>
    </header>
  )
}
