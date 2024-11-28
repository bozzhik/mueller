import {cn} from '@/lib/utils'
import {H1, H6, P} from '~/UI/Typography'

export const blockHeight = 'h-[91vh] sm:h-[94vh]'

export default function Hero() {
  const cities = ['Москва', 'Берлин', 'Кирения']

  return (
    <section data-section="hero-index" className={cn('grid grid-cols-2 sm:flex sm:flex-col-reverse', blockHeight)}>
      <div className="overflow-hidden sm:h-[52vh]">
        <video autoPlay loop muted playsInline className="block object-cover w-full h-full bg-gray-light/25">
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex flex-col justify-between pt-7 sm:gap-5">
        <P className="px-10 uppercase sm:px-3 xl:px-7">Коллегия адвокатов нового поколения, в которую входят европейские и российские адвокаты, специализирующиеся на санкциях</P>

        <div className="space-y-7 xl:space-y-5">
          <H1 className="px-10 xl:px-7 sm:px-3">Мы знаем правила игры</H1>

          <div className="grid grid-cols-3 border-t divide-x border-gray divide-gray">
            {cities.map((city, index) => (
              <div className="grid py-2 place-items-center sm:py-1 sm:pb-1.5" key={index}>
                <H6>{city}</H6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
