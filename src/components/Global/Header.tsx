import Image from 'next/image'
import Link from 'next/link'

import MuellerLogo from '$/logo.svg'
import {Text} from 'lucide-react'

const websitePaths = {
  services: 'Преимущества',
  specialization: 'Специализация',
  achievements: 'Успехи',
  offices: 'Офисы',
  media: 'Мы в СМИ',
  blog: 'Блог',
  contacts: 'Контакты',
}

export const headerPadding = 'pt-[10vh]'

function DesktopHeader() {
  return (
    <header className={'fixed grid w-full h-[9vh] grid-cols-10 bg-white border-b border-gray'}>
      <Link href="/" className="grid col-span-2 border-r place-items-center border-gray">
        <Image src={MuellerLogo} className="object-contain w-[85%]" alt="Mueller Wagner logo" />
      </Link>

      <nav className="flex items-center justify-center col-span-6 gap-8 -mt-1.5">
        {Object.entries(websitePaths).map(([key, label]) => (
          <Link href={`/#${key}`} className="text-xl uppercase duration-200 border-b border-transparent hover:border-foreground" key={key}>
            {label}
          </Link>
        ))}
      </nav>

      <Link href="presentation.pdf" target="_blank" className="group grid col-span-2 bg-blue place-items-center -mt-1.5">
        <div className="flex items-center gap-2">
          <Text className="text-white" />
          <span className="pb-1 text-2xl text-white duration-500 group-hover:translate-x-1.5">Скачать презентацию</span>
        </div>
      </Link>
    </header>
  )
}

export default function Header() {
  return <DesktopHeader />
}
