import MuellerLogo from '$/logo.svg'

import {websitePaths} from '@/lib/constants'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="grid grid-cols-4 divide-x divide-gray">
      <div className="col-span-1 flex flex-col justify-between p-6">
        <Image src={MuellerLogo} className="object-contain w-[85%]" alt="Mueller Wagner logo" />

        <span className="text-xl uppercase text-gray-light">2024, все права защищены</span>
      </div>

      <div className="col-span-3 grid grid-cols-3">
        <div className="">
          {Object.entries(websitePaths).map(([key, label]) => (
            <Link href={`/#${key}`} className="text-xl uppercase duration-200 border-b border-transparent xl:text-base hover:border-foreground" key={key}>
              {label}
            </Link>
          ))}
        </div>

        <Link href="presentation.pdf" target="_blank" className="group bg-blue place-items-center">
          <span className="pb-1 text-2xl text-white duration-500 xl:text-lg group-hover:translate-x-1">Скачать презентацию</span>
        </Link>
      </div>
    </footer>
  )
}
