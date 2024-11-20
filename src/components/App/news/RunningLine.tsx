'use client'

import {cn} from '@/lib/utils'
import {useEffect, useRef} from 'react'
import {horizontalLoop} from '@/lib/gsap/horizontal-loop'
import {H1} from '../../UI/Typography'

const items = Array(7).fill('Мы в сми')

export default function RunningLine() {
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!marqueeRef.current) return

    const marqueeItems = marqueeRef.current.querySelectorAll('[data-marquee="item"]')

    horizontalLoop(marqueeItems, {
      repeat: -1,
      speed: 2,
      paddingRight: 0,
    })
  }, [])

  return (
    <div className={cn('border-t-[1px] border-gray-light')}>
      <div ref={marqueeRef} className="relative flex overflow-hidden">
        {items.map((item, index) => (
          <div data-marquee="item" className="pt-8 pb-10 px-10 sm:px-7 xl:py-6 sm:py-4 shrink-0 flex items-center justify-center pointer-events-none" key={index}>
            <H1 className="block sm:text-5xl">{item}</H1>
          </div>
        ))}
      </div>
    </div>
  )
}
