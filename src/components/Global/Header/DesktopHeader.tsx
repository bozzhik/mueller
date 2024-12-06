'use client'

import MuellerLogo from '$/logo.svg'

import {usePathname} from 'next/navigation'
import {urlForFile} from '#/src/sanity/lib/file'

import {PresentationData} from '~/Global/Header'
import {hoverLinkStyles} from '~/Global/Footer'
import {websitePaths} from '#/src/lib/constants'

import Link from 'next/link'
import Image from 'next/image'
import {SPAN} from '~/UI/Typography'

function Button({href, target = '_blank', label}: {href: string; target?: '_self' | '_blank'; label: string}) {
  return (
    <Link href={href} target={target} className="grid px-10 xl:px-7 text-white bg-blue duration-500 hover:bg-blue/95 place-items-center -mt-0.5">
      <SPAN className="block pb-1 text-[22px] text-nowrap uppercase">{label}</SPAN>
    </Link>
  )
}

export function DesktopHeader({presentationsData}: {presentationsData: PresentationData[]}) {
  const pathname = usePathname()
  const isEuroclear = pathname.includes('euroclear')

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

      <div className="flex divide-x-2 divide-gray-light">
        {isEuroclear ? (
          presentationsData[1] && <Button href={urlForFile(presentationsData[1].presentation?.file?.asset?._ref || '')} label={presentationsData[1].presentation?.caption || ''} />
        ) : (
          <>
            {presentationsData[0] && <Button href={urlForFile(presentationsData[0].presentation?.file?.asset?._ref || '')} label={presentationsData[0].presentation?.caption || ''} />}
            <Button href="/euroclear" target="_self" label="Euroclear" />
          </>
        )}
      </div>
    </header>
  )
}
