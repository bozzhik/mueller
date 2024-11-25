'use client'

import {blockHeight} from '~~/index/Hero'

import {cn} from '#/src/lib/utils'
import {urlFor} from '#/src/sanity/lib/image'
import {useScrollTrigger} from '#/src/hooks/useScrollTrigger'

import Image from 'next/image'
import {H1, H2, H6, P} from '~/UI/Typography'

type Props = {
  heading: string | null
  list: string[] | null
  advantages: string[]
  image: never
}

export default function Hero({heading, list, advantages, image}: Props) {
  useScrollTrigger({selector: 'fixed-specialization-image'})

  const imageUrl = image ? urlFor(image).url() : null

  return (
    <div className={cn('grid grid-cols-2 sm:flex sm:flex-col')}>
      {imageUrl && (
        <>
          <div data-scroll-trigger="fixed-specialization-image" className="sm:hidden">
            <Image quality={100} priority={true} className="block object-cover w-full h-screen" src={imageUrl} alt={heading || ''} width={1000} height={1000} />
          </div>

          <div className="hidden sm:block h-[45vh]">
            <Image quality={100} priority={true} className="block object-cover w-full h-full" src={imageUrl} alt={heading || ''} width={1000} height={1000} />
          </div>
        </>
      )}

      <div>
        <section data-section="hero-specialization" className={cn('flex flex-col justify-between', blockHeight, 'sm:h-auto sm:gap-4 sm:mt-7')}>
          <H1 className="p-7 sm:p-3">{heading || 'Default Heading'}</H1>

          <div className={`flex flex-col sm:pb-1 divide-y divide-gray border-t border-b border-gray ${list?.length && list.length > 2 && 'divide-y'}`}>
            {list?.map((item, idx) => (
              <div className="flex items-center gap-8 pt-0 pb-4 p-7 sm:p-3 sm:pt-2 sm:pb-6 sm:gap-6 sm:px-4" key={idx}>
                <div className="text-[70px] xl:text-6xl s-fit leading-normal">{`${idx + 1}`}</div>
                <P className="pt-4 sm:pt-3">{`${item}`}</P>
              </div>
            ))}
          </div>
        </section>

        <section data-section="hero-specialization">
          <div className="p-10 text-white sm:px-5 sm:py-4 xl:py-8 bg-blue sm:space-y-2">
            <H2 className="sm:max-w-[20ch]">Наши достижения</H2>
          </div>

          <div className="grid grid-cols-2 border-b border-l divide-x sm:divide-x-0 sm:border-l-0 sm:divide-y sm:grid-cols-1 divide-gray border-gray">
            {advantages.slice(0, 4).map((item, idx) => (
              <div className={cn('flex p-7 pb-24 sm:pl-3 sm:pr-6 gap-6 xl:gap-4 xl:p-5 xl:pb-20 sm:py-7')} key={idx}>
                <H6 className="text-3xl !leading-none xl:text-2xl sm:text-xl">{idx + 1}</H6>
                <P className="text-[28px] !leading-[1.25]">{item}</P>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
