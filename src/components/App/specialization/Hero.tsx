import {blockHeight} from '~~/index/Hero'

import {cn} from '#/src/lib/utils'
import {urlFor} from '#/src/sanity/lib/image'

import Image from 'next/image'
import {H1} from '~/UI/Typography'

type Props = {
  heading: string | null
  icon: never
  image: never
}

export default function Hero({heading, icon, image}: Props) {
  const imageUrl = image ? urlFor(image).url() : null
  const iconUrl = icon ? urlFor(icon).url() : null

  return (
    <section data-section="hero-specialization" className={cn('grid grid-cols-2 sm:flex sm:flex-col-reverse', blockHeight, 'sm:h-auto sm:gap-5 sm:mt-10')}>
      {imageUrl && (
        <div className="overflow-hidden sm:h-[52vh]">
          <Image quality={100} priority={true} className="block object-cover w-full h-full" src={imageUrl} alt={heading || ''} width={1000} height={1000} />
        </div>
      )}

      <div className="flex flex-col justify-between p-7 sm:gap-5 sm:p-3">
        {iconUrl && (
          <div className="s-32 xl:s-20 sm:s-16">
            <Image quality={100} className="block object-cover w-full h-full" src={iconUrl} alt={heading || ''} width={1000} height={1000} />
          </div>
        )}

        <H1 className="">{heading || 'Default Heading'}</H1>
      </div>
    </section>
  )
}
