'use client'

import {useEffect} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'

export const useScrollTrigger = ({selector}: {selector: string}) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const element = `[data-scroll-trigger="${selector}"]`

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        scrub: true,
        markers: false,
        pinSpacing: false,
      },
    })
  }, [selector])
}
