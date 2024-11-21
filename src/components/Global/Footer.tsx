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
    <footer className="grid grid-cols-4 divide-x divide-gray">
      <div className="flex flex-col justify-between col-span-1 p-6">
        <Image src={MuellerLogo} className="object-contain w-[80%]" alt="Mueller Wagner logo" />

        <SPAN className="text-gray-light">2024, все права защищены</SPAN>
      </div>

      <div className="grid grid-cols-3 col-span-3 gap-4 p-6">
        {chunks.map((chunk, colIndex) => (
          <div className="flex flex-col gap-14" key={colIndex}>
            <div className="flex flex-col gap-2.5">
              {chunk.map(([key, label]) => (
                <Link href={`/#${key}`} className={cn(hoverLinkStyles, 'w-fit')} key={key}>
                  <SPAN>{label}</SPAN>
                </Link>
              ))}
            </div>

            {colIndex === 0 && (
              <Link href="presentation.pdf" target="_blank" className="grid px-10 py-3 text-white duration-500 w-fit place-items-center bg-blue hover:bg-blue/85">
                <SPAN className="pb-1 text-2xl normal-case">Скачать презентацию</SPAN>
              </Link>
            )}

            {colIndex === 2 && (
              <Link href="" className={cn(hoverLinkStyles, 'text-gray-light hover:border-gray-light w-fit')}>
                <SPAN>
                  Политика <br /> конфиденциальности
                </SPAN>
              </Link>
            )}
          </div>
        ))}
      </div>
    </footer>
  )
}
