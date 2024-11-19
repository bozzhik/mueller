'use client'

import {useMediaQuery} from '@/hooks/useMediaQuery'

import Image from 'next/image'
import Link from 'next/link'

import MuellerLogo from '$/logo.svg'
import {Text, MenuIcon} from 'lucide-react'

const websitePaths = {
  advantages: 'Преимущества',
  specialization: 'Специализация',
  achievements: 'Успехи',
  blog: 'Блог',
  media: 'Мы в СМИ',
  contacts: 'Контакты',
}

function DesktopHeader() {
  return (
    <header className={'fixed z-[99] grid w-full h-[9vh] grid-cols-10 bg-white border-b border-gray'}>
      <Link href="/" className="grid col-span-2 border-r place-items-center border-gray">
        <Image src={MuellerLogo} className="object-contain w-[85%]" alt="Mueller Wagner logo" />
      </Link>

      <nav className="flex items-center justify-center col-span-6 gap-8 xl:gap-4 -mt-1.5 xl:-mt-0.5">
        {Object.entries(websitePaths).map(([key, label]) => (
          <Link href={`/#${key}`} className="text-xl uppercase duration-200 border-b border-transparent xl:text-base hover:border-foreground" key={key}>
            {label}
          </Link>
        ))}
      </nav>

      <Link href="presentation.pdf" target="_blank" className="group grid col-span-2 bg-blue place-items-center -mt-1.5 xl:-mt-0.5">
        <div className="flex items-center gap-2">
          <Text className="text-white" />
          <span className="pb-1 text-2xl text-white duration-500 xl:text-lg group-hover:translate-x-1">Скачать презентацию</span>
        </div>
      </Link>
    </header>
  )
}

function MobileHeader() {
  return (
    <header className="fixed flex items-center justify-between w-full z-[99] bg-white">
      <Link href="/" className="grid w-56 pl-3 place-items-center">
        <Image src={MuellerLogo} className="object-contain w-full h-full" alt="Mueller Wagner logo" />
      </Link>

      <div className="p-3 bg-blue">
        <MenuIcon className="text-white" />
      </div>
    </header>
  )
}

export default function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return isDesktop ? <DesktopHeader /> : <MobileHeader />
}
