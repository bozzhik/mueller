import AchievementsImage from '$/index/achievements.jpg'

import {cn} from '#/src/lib/utils'

import Image from 'next/image'
import {H2, H6, P} from '~/UI/Typography'

export default function Achievements({data}: {data: string[]}) {
  return (
    <section id="achievements" data-section="details-achievements-index" className="sm:flex sm:flex-col-reverse">
      <div>
        <div className="p-10 text-white sm:px-5 sm:py-4 xl:py-8 bg-blue sm:space-y-2">
          <H2 className="sm:max-w-[20ch]">Наши достижения</H2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-1">
          {data.slice(0, 4).map((item, idx) => (
            <div className={cn('flex p-7 pb-36 sm:pl-3 sm:pr-6 gap-6 xl:gap-4 xl:p-5 xl:pb-24 sm:py-7 border-gray', idx == 0 && 'border-b', idx == 1 && 'border-l border-b', idx == 3 && 'border-l', 'sm:border-b sm:border-r-0 sm:border-l-0')} key={idx}>
              <H6 className="text-3xl !leading-none xl:text-2xl sm:text-xl">{idx + 1}</H6>
              <P className="text-[28px] !leading-[1.25]">{item}</P>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden sm:block h-[40vh]">
        <Image quality={100} className="absolute inset-0 object-cover w-full h-full" src={AchievementsImage} alt="" />
      </div>
    </section>
  )
}
