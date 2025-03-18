'use client'

import BlogImage1 from '$/news/1.jpg'
import BlogImage2 from '$/news/2.jpg'
import BlogImage3 from '$/news/3.jpg'
import BlogImage4 from '$/news/4.jpg'

import type {BLOG_QUERYResult} from '#/sanity.types'

import {cn} from '#/src/lib/utils'
import {useRef} from 'react'
import {urlFor} from '#/src/sanity/lib/image'

import Link from 'next/link'
import {H4, H6} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'
// import ImageShader from '~/UI/ImageShader'
import Image from 'next/image'

type BLOG_QUERYResultItem = BLOG_QUERYResult[number]

type BlogCardProps = Partial<BLOG_QUERYResultItem> & {
  index: number
  className?: string
}

const fallbackImages = [BlogImage1, BlogImage2, BlogImage3, BlogImage4]
let currentImageIndex = 0

function getNextImage(): string {
  const image = fallbackImages[currentImageIndex].src
  currentImageIndex = (currentImageIndex + 1) % fallbackImages.length
  return image
}

export function BlogCard({heading, caption, date, slug, image, className}: BlogCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const imageUrl = image?.asset ? urlFor(image).url() : null
  const fallbackImageSrc = getNextImage()

  const imageStyles = 'overflow-hidden border-b border-gray block w-full h-[40vh] xl:h-[35vh] sm:h-[40vh] object-cover'

  return (
    <Link ref={cardRef} href={`/blog/${slug?.current}`} className={cn('border-r border-b border-gray', className)}>
      <div className={imageStyles}>
        {/* <ImageShader src={imageUrl || fallbackImageSrc} alt={image?.alt || 'Новость про Mueller Wagner'} /> */}
        <Image src={imageUrl || fallbackImageSrc} alt={image?.alt || 'Новость про Mueller Wagner'} width={700} height={700} />
      </div>

      <div className="px-6 pt-4 pb-16 space-y-5 xl:px-4 xl:pt-3 xl:pb-14 sm:pt-5 sm:pb-7 xl:space-y-2">
        <HoverText triggerRef={cardRef}>
          <H6 className="uppercase">{date}</H6>
        </HoverText>

        <div className="space-y-2 xl:space-y-1.5">
          <H4 className="leading-[1.2] xl:leading-[1.2] font-bold uppercase font-kaius">{heading}</H4>
          {caption && <H6 className="leading-[1.15] xl:leading-[1.1] line-clamp-3">{caption}</H6>}
        </div>
      </div>
    </Link>
  )
}
