import {NEWS_QUERYResult} from '#/sanity.types'
import {urlFor} from '#/src/sanity/lib/image'

import Image from 'next/image'
import Link from 'next/link'
import {H4, H6} from '~/UI/Typography'

type NewsItem = NEWS_QUERYResult[number]

export function NewsCard({heading, caption, publisher, source, id, image}: NewsItem) {
  const imageUrl = image?.asset ? urlFor(image).url() : null
  // const newsPublisher = publisher || (source ? new URL(source).hostname.replace('www.', '') : '')

  return (
    <Link href={source || ''} className={`${id == 4 && 'xl:hidden'}`}>
      {imageUrl && <Image className="border-b border-gray block w-full h-[40vh] xl:h-[35vh] object-cover" src={imageUrl} alt={image?.alt || heading || 'Новость про Mueller Wagner'} width={300} height={200} />}

      <div className="px-6 pt-4 pb-16 xl:px-4 xl:pt-3 xl:pb-14 sm:pt-5 sm:pb-7 space-y-5 xl:space-y-2">
        <H6>{publisher}</H6>

        <div className="space-y-2 xl:space-y-1.5">
          <H4 className="leading-[1.2] xl:leading-[1.2] font-bold uppercase font-kaius">{heading}</H4>
          <H6 className="leading-[1.15] xl:leading-[1.1]">{caption}</H6>
        </div>
      </div>
    </Link>
  )
}
