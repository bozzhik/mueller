import MuellerLogo from '$/logo.svg'
import {websitePaths} from '@/lib/constants'

import {cn} from '#/src/lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import {SPAN} from '~/UI/Typography'

export const hoverLinkStyles = 'duration-200 border-b border-transparent hover:border-foreground'

export default function Footer() {
  const websitePathsArray = Object.entries(websitePaths)
  const chunkSize = Math.ceil(websitePathsArray.length / 3)
  const chunks = Array.from({length: 3}, (_, i) => websitePathsArray.slice(i * chunkSize, i * chunkSize + chunkSize))

  return (
    <footer className="grid grid-cols-4 border-t divide-x sm:flex sm:flex-col sm:gap-8 sm:pb-6 sm:divide-none divide-gray border-gray">
      <div className="flex flex-col justify-between col-span-1 p-6 sm:px-3 sm:pt-5 sm:pb-0 sm:gap-2">
        <Image src={MuellerLogo} className="object-contain w-[80%] sm:w-[66%]" alt="Mueller Wagner logo" />

        <SPAN className="sm:hidden text-gray-light">2024, все права защищены</SPAN>
      </div>

      <div className="grid grid-cols-3 col-span-3 gap-4 px-6 py-5 sm:gap-1.5 sm:px-3 sm:py-0 sm:grid-cols-1">
        {chunks.map((chunk, colIndex) => (
          <div className="flex flex-col gap-12 sm:gap-1.5" key={colIndex}>
            <div className="flex flex-col gap-2 xl:gap-1.5 sm:gap-1.5">
              {chunk.map(([key, label]) => (
                <Link href={`/#${key}`} className={cn(hoverLinkStyles, 'w-fit')} key={key}>
                  <SPAN>{label}</SPAN>
                </Link>
              ))}
            </div>

            {colIndex === 0 && (
              <Link href="/privacy-policy" className={cn(hoverLinkStyles, 'sm:hidden text-gray-light hover:border-gray-light w-fit')}>
                <SPAN>Политика конфиденциальности</SPAN>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex-col hidden gap-2 px-3 sm:flex">
        <Link href="/privacy-policy" className={cn(hoverLinkStyles, 'text-gray-light border-gray-light w-fit')}>
          <SPAN>
            Политика <br /> конфиденциальности
          </SPAN>
        </Link>

        <SPAN className="text-gray-light">2024, все права защищены</SPAN>
      </div>
    </footer>
  )
}
