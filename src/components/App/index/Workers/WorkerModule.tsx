import {urlFor} from '#/src/sanity/lib/image'
import Image from 'next/image'

import {H2, H6, P} from '~/UI/Typography'
import {Worker} from '#/sanity.types'

export const WorkerModule = ({worker, index}: {worker: Worker; index: number}) => {
  const {id, name, position, honors, image} = worker
  const imageUrl = image?.asset ? urlFor(image).url() : null

  const isEven = index % 2 === 0

  return (
    <div className={`flex justify-between ${isEven && 'flex-row-reverse'}`} key={id}>
      <div className="px-8 py-12 w-1/2">
        <div className="space-y-6">
          <H6 className="uppercase">{position}</H6>
          <div className="space-y-3">
            <H2>{name}</H2>
            {honors && (
              <div className="space-y-3">
                {honors.map((honor) => (
                  <div key={honor}>
                    <P className="uppercase text-gray-light max-w-[35ch]">{honor}</P>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="w-[49.6vw]">
          <Image quality={100} className="block object-contain w-full h-full" src={imageUrl} alt={name || ''} width={1000} height={1000} />
        </div>
      )}
    </div>
  )
}
