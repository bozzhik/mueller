'use client'

import DetailsModuleImage from '$/index/details.jpg'

import {cn} from '#/src/lib/utils'
import {SpecializationItem} from '#/sanity.types'

import {useEffect} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'

import Image from 'next/image'
import Advantages from '~~/index/Details/Advantages'
import Specialization from '~~/index/Details/Specialization'

const DetailsImage = ({className}: {className?: string}) => {
  return <Image className={cn('block object-cover w-full h-full', className)} src={DetailsModuleImage} alt="Преимущества Muller Wagner" />
}

export default function DetailsModule({advantages, specialization}: {advantages: string[]; specialization: SpecializationItem[]}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to('[data-gsap="fixed-image"]', {
      scrollTrigger: {
        trigger: '[data-gsap="fixed-image"]',
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        scrub: true,
        markers: false,
        pinSpacing: false,
      },
    })
  }, [])

  return (
    <section data-section="details-index" className="overflow-hidden relative grid grid-cols-2 sm:grid-cols-1">
      <div>
        <Advantages data={advantages} />

        <div className="h-[40vh] hidden sm:block">
          <DetailsImage />
        </div>

        <Specialization data={specialization} />
      </div>

      <div data-gsap="fixed-image" className="sm:hidden">
        <DetailsImage className="h-screen" />
      </div>
    </section>
  )
}
