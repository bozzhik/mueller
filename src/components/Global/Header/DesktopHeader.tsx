'use client'

import MuellerLogo from '$/logo.svg'

import {PRESENTATIONS_QUERYResult} from '#/sanity.types'
import {websitePaths} from '#/src/lib/constants'
import {hoverLinkStyles} from '~/Global/Footer'

import {usePathname} from 'next/navigation'
import {urlForFile} from '#/src/sanity/lib/file'

import Link from 'next/link'
import Image from 'next/image'
import {SPAN} from '~/UI/Typography'

type PRESENTATIONS_QUERYResultItem = PRESENTATIONS_QUERYResult[number]

export function DesktopHeader({action}: {action: PRESENTATIONS_QUERYResultItem[]}) {
  const pathname = usePathname()

  // Filter the default and current presentation
  const [defaultPresentation] = action.filter((p: PRESENTATIONS_QUERYResultItem) => p.name === 'Общая')
  const currentPresentation = action.find((p: PRESENTATIONS_QUERYResultItem) => pathname.includes('czennye-bumagi') && p.name === 'Ценные бумаги') || defaultPresentation

  // Ensure the currentPresentation exists before rendering
  if (!currentPresentation) return null

  return (
    <header className="sm:hidden fixed z-[99] grid w-full h-[9vh] grid-cols-10 bg-white border-b border-gray">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/" className="grid col-span-2 border-r place-items-center border-gray">
        <Image src={MuellerLogo} className="object-contain w-[85%]" alt="Mueller Wagner logo" />
      </a>

      <nav className="flex items-center justify-center col-span-6 gap-8 xl:gap-4 -mt-1.5 xl:-mt-0.5">
        {Object.entries(websitePaths).map(([key, label]) => (
          <Link href={`/#${key}`} className={hoverLinkStyles} key={key}>
            <SPAN>{label}</SPAN>
          </Link>
        ))}
      </nav>

      <Link href={urlForFile(currentPresentation.file?.asset?._ref || '')} target="_blank" className="grid col-span-2 text-white bg-blue duration-500 hover:bg-blue/95 place-items-center -mt-1.5 xl:-mt-0.5">
        <SPAN className="pb-1 text-2xl normal-case xl:text-xl">{currentPresentation.caption}</SPAN>
      </Link>
    </header>
  )
}
