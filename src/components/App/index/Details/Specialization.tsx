'use client'

import {SpecializationItem} from '#/sanity.types'

import {useState, useEffect, useRef} from 'react'
import {urlFor} from '#/src/sanity/lib/image'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {H2, H3, H4} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'

export default function Specialization({data}: {data: SpecializationItem[]}) {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>(Array(data.length).fill(null))
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <section id="specialization" data-section="details-specialization-index">
      <div className="p-10 text-white sm:px-5 sm:py-4 xl:py-8 bg-blue">
        <H2 className="sm:max-w-[20ch]">Наша специализация</H2>
      </div>

      <div className="divide-y divide-gray">
        {data.map(({heading, list, icon, slug}, idx) => {
          const imageUrl = icon?.asset ? urlFor(icon).url() : null

          return (
            <Link
              ref={(el) => {
                itemRefs.current[idx] = el
              }}
              href={`/specialization/${slug}`}
              className={cn('flex items-start gap-10 px-10 group sm:gap-7 sm:pl-3 sm:pr-6 sm:flex-col py-14 xl:py-10 sm:py-7', 'hover:bg-blue hover:text-white duration-500')}
              key={idx}
            >
              {imageUrl && (
                <div className="s-32 xl:s-20 sm:s-16 group-hover:scale-[1.07] group-hover:brightness-[400] duration-300">
                  <Image className="block object-contain w-full h-full" src={imageUrl} alt={heading || ''} width={128} height={128} />
                </div>
              )}

              <div className="sm:space-y-1">
                <div className="flex gap-2.5">
                  {isHydrated && (
                    <HoverText triggerRef={{current: itemRefs.current[idx]}}>
                      <H3>{heading}</H3>
                    </HoverText>
                  )}
                </div>

                <div className="space-y-4 divide-y sm:space-y-3 divide-gray sm:divide-gray/30 group-hover:divide-white-dirty">
                  {list?.map((item, index) => (
                    <H4 className="uppercase max-w-[40ch] pt-4 sm:pt-2.5" key={index}>
                      {item}
                    </H4>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
