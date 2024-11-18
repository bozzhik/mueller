'use client'

import DetailsModuleImage from '$/index/details.jpg'

import {cn} from '#/src/lib/utils'
import {SpecializationItem} from '#/sanity.types'
import {useScrollTrigger} from '#/src/hooks/useScrollTrigger'

import Image from 'next/image'
import Advantages from '~~/index/Details/Advantages'
import Specialization from '~~/index/Details/Specialization'

const DetailsImage = ({className}: {className?: string}) => {
  return <Image className={cn('block object-cover w-full h-full', className)} src={DetailsModuleImage} alt="Преимущества Muller Wagner" />
}

export default function DetailsModule({advantages, specialization}: {advantages: string[]; specialization: SpecializationItem[]}) {
  useScrollTrigger({selector: 'fixed-image'})

  return (
    <section data-section="details-index" className="relative grid grid-cols-2 overflow-hidden sm:grid-cols-1">
      <div>
        <Advantages data={advantages} />

        <div className="h-[40vh] hidden sm:block">
          <DetailsImage />
        </div>

        <Specialization data={specialization} />
      </div>

      <div data-scroll-trigger="fixed-image" className="sm:hidden">
        <DetailsImage className="h-screen" />
      </div>
    </section>
  )
}
