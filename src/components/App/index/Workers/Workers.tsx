import {urlFor} from '#/src/sanity/lib/image'
import {sanityFetch} from '@/sanity/lib/live'
import {WORKERS_QUERY} from '@/sanity/lib/queries'
import Image from 'next/image'

import {H2, H6} from '~/UI/Typography'

export default async function Workers() {
  const {data: workers} = await sanityFetch({
    query: WORKERS_QUERY,
  })

  return (
    <section data-section="workers-index">
      {workers.map((worker, index) => {
        const {id, name, position, image} = worker
        const imageUrl = image?.asset ? urlFor(image).url() : null

        const isEven = index % 2 === 0

        return (
          <div className={`flex justify-between ${isEven && 'flex-row-reverse'}`} key={id}>
            <div className="px-8 py-12 w-1/2 space-y-2">
              <H6 className="uppercase">{position}</H6>
              <H2>{name}</H2>
            </div>

            {imageUrl && (
              <div className="w-[49.6vw]">
                <Image quality={100} className="block object-contain w-full h-full" src={imageUrl} alt={name || ''} width={1000} height={1000} />
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
