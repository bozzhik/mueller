import {Worker, WorkerItem} from '#/sanity.types'
import {urlFor} from '#/src/sanity/lib/image'

import Image from 'next/image'
import {H2, H3, H6, P} from '~/UI/Typography'

export const WorkerModule = ({worker, index}: {worker: Worker; index: number}) => {
  const {id, name, position, honors, education, career, other, image} = worker

  const imageUrl = image?.asset ? urlFor(image).url() : null
  const isEven = index % 2 === 0

  return (
    <div className={`flex sm:flex-col-reverse justify-between items-start ${isEven && 'flex-row-reverse'}`} key={id}>
      <div className="w-1/2 pt-12 space-y-16 xl:space-y-8 sm:space-y-4 xl:pt-10 sm:pt-6 sm:w-full">
        <div className="px-8 space-y-6 xl:px-6 xl:space-y-4 sm:space-y-3 sm:px-3">
          <H6 className="uppercase">{position}</H6>
          <div className="space-y-3 xl:space-y-2 sm:space-y-1">
            <H2>{name}</H2>
            {honors && (
              <div className="space-y-3 xl:space-y-1.5">
                {honors.map((honor) => (
                  <div key={honor}>
                    <P className="uppercase text-gray-light max-w-[35ch]">{honor}</P>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pb-2 space-y-2">
          {education && education.map((items: WorkerItem, index: number) => <WorkerModuleItem data={items} key={index} />)}
          {career && career.map((items: WorkerItem, index: number) => <WorkerModuleItem data={items} key={index} />)}
          {other && other.map((items: WorkerItem, index: number) => <WorkerModuleItem data={items} key={index} />)}
        </div>
      </div>

      {imageUrl && (
        <div className="w-[49.6vw] sm:w-full sm:h-[40vh] h-full">
          <Image quality={100} className="block object-cover h-full" src={imageUrl} alt={name || ''} width={1000} height={1000} />
        </div>
      )}
    </div>
  )
}

const WorkerModuleItem = ({data}: {data: WorkerItem}) => {
  return (
    <div>
      <H3 className="px-10 sm:px-3 py-2.5 sm:pr-5 text-white bg-blue">{data.heading}</H3>

      <div className="px-8 divide-y xl:px-6 sm:px-3 divide-gray xl:-px-8">
        {data.items?.map((item: string, idx: number) => (
          <div className="py-4" key={idx}>
            <H6 className="max-w-[50ch]">{item}</H6>
          </div>
        ))}
      </div>
    </div>
  )
}
