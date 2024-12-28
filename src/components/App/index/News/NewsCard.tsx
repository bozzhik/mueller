'use client'

import NewsImage1 from '$/news/1.jpg'
import NewsImage2 from '$/news/2.jpg'
import NewsImage3 from '$/news/3.jpg'
import NewsImage4 from '$/news/4.jpg'

import {NEWS_QUERYResult, BLOG_QUERYResult} from '#/sanity.types'

import {cn} from '#/src/lib/utils'
import {useRef} from 'react'
import {urlFor} from '#/src/sanity/lib/image'

import Link from 'next/link'
import {H4, H6} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'
import ImageShader from '~/UI/ImageShader'

type NEWS_QUERYResultItem = NEWS_QUERYResult[number]
type BLOG_QUERYResultItem = BLOG_QUERYResult[number]

type NewsCardProps = Partial<NEWS_QUERYResultItem> &
  Partial<BLOG_QUERYResultItem> & {
    media?: {
      url: string
      alt: string
    }
    date?: string | null

    className?: string
    cms?: boolean
    type?: 'news' | 'blog'
  }

const fallbackImages = [NewsImage1, NewsImage2, NewsImage3, NewsImage4]
let currentImageIndex = 0

function getNextImage(): string {
  const image = fallbackImages[currentImageIndex].src
  currentImageIndex = (currentImageIndex + 1) % fallbackImages.length
  return image
}

export function NewsCard({type = 'news', heading, caption, publisher, date, source, image, media, className, cms}: NewsCardProps & {index: number}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const imageUrl = cms ? (image?.asset ? urlFor(image).url() : null) : media?.url || null
  const imageAlt = cms ? image?.alt : media?.alt
  const fallbackImageSrc = getNextImage()

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

    return type === 'blog' ? '' : 'Unknown Publisher'
  }

  const imageStyles = 'overflow-hidden border-b border-gray block w-full h-[40vh] xl:h-[35vh] sm:h-[40vh] object-cover'

  return (
    <Link ref={cardRef} href={type === 'news' && source ? source : '<slug>'} className={cn('border-r border-b border-gray', className)}>
      <div className={imageStyles}>
        <ImageShader src={imageUrl || fallbackImageSrc} alt={imageAlt || 'Новость про Mueller Wagner'} />
      </div>

      <div className="px-6 pt-4 pb-16 space-y-5 xl:px-4 xl:pt-3 xl:pb-14 sm:pt-5 sm:pb-7 xl:space-y-2">
        <HoverText triggerRef={cardRef}>
          <H6 className="uppercase">{type === 'news' ? getPublisher(source, publisher) : date}</H6>
        </HoverText>

        <div className="space-y-2 xl:space-y-1.5">
          <H4 className="leading-[1.2] xl:leading-[1.2] font-bold uppercase font-kaius">{heading}</H4>
          {caption && <H6 className="leading-[1.15] xl:leading-[1.1] line-clamp-3">{caption}</H6>}
        </div>
      </div>
    </Link>
  )
}
