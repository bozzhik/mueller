'use client'

import {EUROCLEAR_QUERYResult} from '#/sanity.types'
import {PRESENTATIONS_QUERYResultItem} from '~/Global/Header'

import {cn} from '#/src/lib/utils'
import {notFound} from 'next/navigation'
import {useScrollTrigger} from '#/src/hooks/useScrollTrigger'
// import {urlFor} from '#/src/sanity/lib/image'
import {urlForFile} from '#/src/sanity/lib/file'

// import Image from 'next/image'
import {H1, H2, H6, P} from '~/UI/Typography'
import {Button} from '~/Global/Header/DesktopHeader'

type HeroProps = {
  data: EUROCLEAR_QUERYResult
  presentation: PRESENTATIONS_QUERYResultItem
}

export default function Hero({data, presentation}: HeroProps) {
  useScrollTrigger({selector: 'fixed-euroclear-image'})

  if (!data) return notFound

  const {heading, action, achievements} = data // , image

  // const imageUrl = image ? urlFor(image).url() : ''

  return (
    <div className={cn('grid grid-cols-2 sm:flex sm:flex-col overflow-hidden')}>
      <>
        <div data-scroll-trigger="fixed-euroclear-image" className="sm:hidden">
          {/* {imageUrl && <Image quality={100} priority={true} className="block object-cover w-full h-screen" src={imageUrl} alt={heading || ''} width={1000} height={1000} />} */}
          <video autoPlay loop muted playsInline className="block object-cover w-full h-screen">
            <source src="/loader/desktop.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="hidden sm:block h-[45vh]">
          {/* {imageUrl && <Image quality={100} priority={true} className="block object-cover w-full h-full" src={imageUrl} alt={heading || ''} width={1000} height={1000} />} */}
          <video autoPlay loop muted playsInline className="block object-cover w-full h-full">
            <source src="/loader/mobile.mp4" type="video/mp4" />
          </video>
        </div>
      </>

      <div>
        <section data-section="hero-specialization" className={cn('flex flex-col gap-[35vh] justify-between sm:gap-4 sm:mt-7')}>
          <H1 className="p-7 sm:p-3">{heading || 'Default Heading'}</H1>

          <div className="flex flex-col sm:pb-1 divide-y divide-gray border-t border-b border-gray">
            <div className="flex items-center gap-8 py-1.5 pb-7 p-7 sm:p-3 sm:pt-2 sm:pb-6 sm:gap-6 sm:px-4">
              <P className="pt-4 sm:pt-3">{action || ''}</P>
            </div>
          </div>
        </section>

        <section data-section="hero-achievements">
          <div className="p-10 text-white sm:px-5 sm:py-4 xl:py-8 bg-blue sm:space-y-2">
            <H2 className="sm:max-w-[20ch]">Наши преимущества</H2>
          </div>

          <div className="grid grid-cols-2 border-b border-l sm:border-l-0 sm:grid-cols-1 divide-gray divide-x sm:divide-x-0 divide-y border-gray">
            {achievements?.map((item: string, idx: number) => {
              const isOdd = achievements.length % 2 !== 0
              const conditionalClass = isOdd && idx === achievements.length - 1 && 'last-of-type:col-span-2 last-of-type:sm:col-span-1 last-of-type:border-b-0'

              return (
                <div className={cn('flex p-7 pb-20 sm:pl-3 sm:pr-6 gap-6 xl:gap-4 xl:p-5 xl:pb-20 sm:py-7 first-of-type:border-t first-of-type:border-l sm:first-of-type:border-l-0', conditionalClass, idx === 0 && 'flex-col justify-between pb-6 gap-12 xl:gap-14 sm:gap-6 xl:pb-4 sm:pb-3 sm:pr-3')} key={idx}>
                  <div className="flex gap-6 xl:gap-4">
                    <H6 className="text-3xl !leading-none xl:text-2xl sm:text-xl">{idx + 1}</H6>
                    <P className="text-[28px] !leading-[1.25]">{item}</P>
                  </div>
                  {idx === 0 && <Button className="w-full pt-2.5 pb-2 xl:text-lg xl:pt-2 xl:pb-1.5" href={urlForFile(presentation?.file?.asset?._ref || '')} label="Посмотреть лицензии" />}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
