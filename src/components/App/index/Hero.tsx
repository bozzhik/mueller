import {cn} from '@/lib/utils'
import Image from 'next/image'

import HeroImage from '$/index/hero.jpg'

export default function Hero() {
  const blockHeight = 'h-[91vh]'

  return (
    <section data-section="hero-index" className={cn('grid grid-cols-2', blockHeight)}>
      <div className="overflow-hidden">
        <Image quality={100} priority={true} className="block object-cover w-full h-full" src={HeroImage} alt="" />
      </div>

      <div className="flex flex-col justify-between px-10 py-7">
        <p className="text-3xl uppercase">Адвокатская коллегия нового поколения, в которую входят европейские и российские адвокаты.</p>
        <h1 className="uppercase text-8xl font-kaius">Мы знаем правила игры</h1>
      </div>
    </section>
  )
}
