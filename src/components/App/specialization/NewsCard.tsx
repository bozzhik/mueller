'use client'

import NewsImage1 from '$/news/1.jpg'
import NewsImage2 from '$/news/2.jpg'
import NewsImage3 from '$/news/3.jpg'
import NewsImage4 from '$/news/4.jpg'

import {NEWS_QUERYResult} from '#/sanity.types'

import {cn} from '#/src/lib/utils'
import {useRef} from 'react'

import Link from 'next/link'
import {H4, H6} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'
// import ImageShader from '~/UI/ImageShader'
import Image from 'next/image'

type NEWS_QUERYResultItem = NEWS_QUERYResult[number]

type NewsCardProps = Partial<NEWS_QUERYResultItem> & {
  className?: string
}

const fallbackImages = [NewsImage1, NewsImage2, NewsImage3, NewsImage4]
let currentImageIndex = 0

function getNextImage(): string {
  const image = fallbackImages[currentImageIndex].src
  currentImageIndex = (currentImageIndex + 1) % fallbackImages.length
  return image
}

export function NewsCard({heading, caption, publisher, source, image, className}: NewsCardProps & {index: number}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const fallbackImageSrc = getNextImage()

  const DOMAIN_NAME_MAP: Record<string, string> = {
    'rbc.ru': 'РБК',
    'kommersant.ru': 'Коммерсант',
  }

  function getPublisher(source?: string | null, publisher?: string | null) {
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
  }

  const imageStyles = 'overflow-hidden border-b border-gray block w-full h-[40vh] xl:h-[35vh] sm:h-[40vh] object-cover'

  return (
    <Link ref={cardRef} href={source || ''} className={cn('border-r border-b border-gray', className)}>
      <div className={imageStyles}>
        {/* <ImageShader src={fallbackImageSrc} alt={image?.alt || 'Новость про Mueller Wagner'} /> */}
        <Image src={fallbackImageSrc} className="block" width={1000} height={100} alt={image?.alt || 'Новость про Mueller Wagner'} />
      </div>

      <div className="px-6 pt-4 pb-16 space-y-5 xl:px-4 xl:pt-3 xl:pb-14 sm:pt-5 sm:pb-7 xl:space-y-2">
        <HoverText triggerRef={cardRef}>
          <H6 className="uppercase">{getPublisher(source, publisher)}</H6>
        </HoverText>

        <div className="space-y-2 xl:space-y-1.5">
          <H4 className="leading-[1.2] xl:leading-[1.2] font-bold uppercase font-kaius">{heading}</H4>
          {caption && <H6 className="leading-[1.15] xl:leading-[1.1] line-clamp-3">{caption}</H6>}
        </div>
      </div>
    </Link>
  )
}
