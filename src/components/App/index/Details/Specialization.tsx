import {SpecializationItem} from '#/sanity.types'
import {urlFor} from '#/src/sanity/lib/image'

import Image from 'next/image'
import Link from 'next/link'
import {H2, H3, H4} from '~/UI/Typography'

export default function Specialization({data}: {data: SpecializationItem[]}) {
  return (
    <section id="specialization" data-section="details-specialization-index">
      <div className="p-10 text-white sm:px-5 sm:py-4 xl:py-8 bg-blue">
        <H2 className="sm:max-w-[20ch]">Наша специализация</H2>
      </div>

      <div className="divide-y divide-gray">
        {data.map(({heading, list, icon, slug}, idx) => {
          const imageUrl = icon?.asset ? urlFor(icon).url() : null

          return (
            <Link href={`/specialization/${slug}`} className="group flex items-start gap-10 px-10 sm:gap-7 sm:pl-3 sm:pr-6 sm:flex-col py-14 xl:py-10 sm:py-7" key={idx}>
              {imageUrl && (
                <div className="s-32 xl:s-20 sm:s-16 group-hover:scale-[1.07] duration-500">
                  <Image className="block object-contain w-full h-full" src={imageUrl} alt={heading || ''} width={128} height={128} />
                </div>
              )}

              <div className="sm:space-y-1">
                <H3>{heading}</H3>

                <div className="space-y-4 divide-y sm:space-y-3 divide-gray sm:divide-gray/30">
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
