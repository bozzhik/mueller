import {NEWS_QUERYResult} from '#/sanity.types'
import {urlFor} from '#/src/sanity/lib/image'

import Image from 'next/image'
import Link from 'next/link'
import {H4, H6} from '~/UI/Typography'

type NEWS_QUERYResultItem = NEWS_QUERYResult[number]

type NewsCardProps = NEWS_QUERYResultItem & {
  cms: boolean
  media?: {
    url: string
    alt: string
  }
}

export function NewsCard({heading, caption, publisher, source, id, image, media, cms}: NewsCardProps) {
  const imageUrl = cms ? (image?.asset ? urlFor(image).url() : null) : media?.url || null
  const imageAlt = cms ? image?.alt : media?.alt

  const DOMAIN_NAME_MAP: Record<string, string> = {
    'rbc.ru': 'РБК',
    'kommersant.ru': 'Коммерсант',
  }

  function getPublisher(source?: string | null, publisher?: string | null): string {
    if (publisher) return publisher

    if (source) {
      function getBaseDomain(hostname: string): string {
        const parts = hostname.split('.')
        return parts.slice(-2).join('.')
      }

      const hostname = new URL(source).hostname.replace('www.', '')
      const baseDomain = getBaseDomain(hostname)
      return DOMAIN_NAME_MAP[baseDomain] || hostname
    }

    return ''
  }

  const imageStyles = 'border-b border-t border-gray block w-full h-[40vh] xl:h-[35vh] object-cover'

  return (
    <Link href={source || ''} className={`${id == 4 && 'xl:hidden'}`}>
      {imageUrl &&
        (cms ? (
          <Image
            quality={100}
            className={imageStyles}
            src={imageUrl} // src={urlFor(image).url()}
            alt={imageAlt || 'Новость про Mueller Wagner'}
            width={300}
            height={200}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={imageStyles}
            src={imageUrl} // src={media?.url}
            alt={imageAlt || 'Новость про Mueller Wagner'}
          />
        ))}

      <div className="px-6 pt-4 pb-16 xl:px-4 xl:pt-3 xl:pb-14 sm:pt-5 sm:pb-7 space-y-5 xl:space-y-2">
        <H6 className="uppercase">{getPublisher(source, publisher)}</H6>

        <div className="space-y-2 xl:space-y-1.5">
          <H4 className="leading-[1.2] xl:leading-[1.2] font-bold uppercase font-kaius">{heading}</H4>
          <H6 className="leading-[1.15] xl:leading-[1.1]">{caption}</H6>
        </div>
      </div>
    </Link>
  )
}
