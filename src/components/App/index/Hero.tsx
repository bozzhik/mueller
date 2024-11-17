import HeroImage from '$/index/hero.jpg'

import {cn} from '@/lib/utils'

import Image from 'next/image'
import {H1, H6, P} from '~/UI/Typography'

export default function Hero() {
  const blockHeight = 'h-[91vh]'
  const cities = ['Москва', 'Берлин', 'Кирения']

  return (
    <section data-section="hero-index" className={cn('grid grid-cols-2 sm:flex sm:flex-col-reverse', blockHeight)}>
      <div className="overflow-hidden">
        <Image quality={100} priority={true} className="block object-cover w-full h-full" src={HeroImage} alt="" />
      </div>

      <div className="flex flex-col justify-between pt-7">
        <P className="uppercase px-10 xl:px-7">Адвокатская коллегия нового поколения, в которую входят европейские и российские адвокаты.</P>

        <div className="space-y-7 xl:space-y-5">
          <H1 className="px-10 xl:px-7">Мы знаем правила игры</H1>

          <div className="grid grid-cols-3 border-t border-gray divide-x divide-gray">
            {cities.map((city, index) => (
              <div className="grid place-items-center py-2" key={index}>
                <H6>{city}</H6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
