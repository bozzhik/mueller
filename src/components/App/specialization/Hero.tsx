import {blockHeight} from '~~/index/Hero'

import {cn} from '#/src/lib/utils'
import {urlFor} from '#/src/sanity/lib/image'

import Image from 'next/image'
import {H1, P} from '~/UI/Typography'

type Props = {
  heading: string | null
  list: string[] | null
  image: never
}

export default function Hero({heading, list, image}: Props) {
  const imageUrl = image ? urlFor(image).url() : null

  return (
    <section data-section="hero-specialization" className={cn('grid grid-cols-2 sm:flex sm:flex-col-reverse', blockHeight, 'sm:h-auto sm:mt-10')}>
      {imageUrl && (
        <div className="overflow-hidden sm:h-[52vh]">
          <Image quality={100} priority={true} className="block object-cover w-full h-full" src={imageUrl} alt={heading || ''} width={1000} height={1000} />
        </div>
      )}

      <div className="flex flex-col justify-between sm:gap-5">
        <H1 className="text-7xl xl:text-5xl sm:text-3xl p-7 sm:p-3">{heading || 'Default Heading'}</H1>

        <div className={`flex flex-col sm:pb-1 divide-y divide-gray border-t border-b border-gray ${list?.length && list.length > 2 && 'divide-y'}`}>
          {list?.map((item, idx) => (
            <div className="p-7 sm:p-3 flex gap-8 sm:gap-6 items-center sm:px-4 pt-0 pb-4 sm:pt-1.5 sm:pb-5" key={idx}>
              <div className="text-[70px] xl:text-6xl s-fit leading-normal">{`${idx + 1}`}</div>
              <P className="pt-4">{`${item}`}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
