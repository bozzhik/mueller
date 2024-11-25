'use client'

import {urlFor} from '#/src/sanity/lib/image'
import {useScrollTrigger} from '#/src/hooks/useScrollTrigger'
import {Worker, WorkerItem} from '#/sanity.types'

import Image from 'next/image'
import {H2, H3, H6, P} from '~/UI/Typography'

export const WorkerModule = ({worker, index}: {worker: Worker; index: number}) => {
  useScrollTrigger({selector: `fixed-image-worker-${index}`})

  const {name, position, honors, education, career, other, image} = worker
  const imageUrl = image?.asset ? urlFor(image).url() : null
  const isEven = index % 2 === 0

  return (
    <div className="relative grid grid-cols-2 overflow-hidden sm:grid-cols-1" key={index}>
      {imageUrl && <WorkerImage imageUrl={imageUrl} index={null} className="hidden sm:block" />}
      {isEven && imageUrl && <WorkerImage imageUrl={imageUrl} index={index} className="sm:hidden" />}

      <div className="pt-12 space-y-16 xl:space-y-8 sm:space-y-4 xl:pt-10 sm:pt-6">
        <div className="px-8 space-y-6 xl:px-6 xl:space-y-4 sm:space-y-3 sm:px-3">
          {<H6 className="uppercase">{position}</H6>}

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

      {!isEven && imageUrl && <WorkerImage imageUrl={imageUrl} index={index} className="sm:hidden" />}
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

const WorkerImage = ({imageUrl, index, className}: {imageUrl: string; index: number | null; className: string}) => {
  return (
    <div {...(index !== null && {'data-scroll-trigger': `fixed-image-worker-${index}`})} className={className}>
      <Image quality={100} className="block object-cover h-screen sm:h-[40vh]" src={imageUrl} width={1000} height={1000} alt="" />
    </div>
  )
}
