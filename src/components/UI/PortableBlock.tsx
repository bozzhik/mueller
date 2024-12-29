import type {BLOG_ITEM_QUERYResult} from '#/sanity.types'

import {cn} from '@/lib/utils'
import {getImageDimensions, type SanityImageSource} from '@sanity/asset-utils'
import {urlFor} from '#/src/sanity/lib/image'
import {PortableText} from '@portabletext/react'

import Link from 'next/link'
import Image from 'next/image'
import {typoClasses} from '~/UI/Typography'

type PortableContent = NonNullable<NonNullable<BLOG_ITEM_QUERYResult>['content']>[number]

const PortableImage = ({value}: {value: SanityImageSource}) => {
  const {width, height} = getImageDimensions(value)
  return (
    <div className="w-fit">
      <Image
        className="w-[50vw] sm:w-full object-contain place-self-center"
        quality={100}
        width={700}
        height={700}
        src={urlFor(value).url()}
        style={{
          aspectRatio: width / height,
        }}
        alt="image"
      />
    </div>
  )
}

export function PortableBlock({value, className}: {value: PortableContent[]; className?: string}) {
  return (
    <div className={cn(typoClasses.p, 'space-y-7 pb-14', className)}>
      <PortableText
        components={{
          types: {
            image: PortableImage,
          },
          marks: {
            link: ({value, children}) => {
              const {href} = value
              return (
                <Link className="duration-200 text-blue underline underline-offset-[3px]" href={href} target="_blank" rel="noopener">
                  {children}
                </Link>
              )
            },
          },
        }}
        value={value}
      />
    </div>
  )
}
