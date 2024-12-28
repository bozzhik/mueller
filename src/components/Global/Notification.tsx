'use client'

import {useState, useEffect, useRef} from 'react'
import {gsap} from 'gsap'

import {H6} from '~/UI/Typography'
import {Button} from '~/Global/Header/DesktopHeader'

export default function Notification() {
  const [show, setShow] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => clearTimeout(showTimeout)
  }, [])

  useEffect(() => {
    if (show && notificationRef.current) {
      gsap.fromTo(notificationRef.current, {y: 100, opacity: 0}, {y: 0, opacity: 1, duration: 0.5, ease: 'power4.out'})

      hideTimeoutRef.current = setTimeout(() => {
        hideNotification()
      }, 10000)
    }

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [show])

  const hideNotification = () => {
    if (notificationRef.current) {
      gsap.to(notificationRef.current, {y: 100, opacity: 0, duration: 0.5, ease: 'power4.in', onComplete: () => setShow(false)})
    }
  }

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)

    hideTimeoutRef.current = setTimeout(() => {
      hideNotification()
    }, 2000)
  }

  if (!show) return null

  return (
    <section id="notification" className="xl:p-5 w-full fixed bottom-0 left-0 flex p-10 pb-8 z-[99]" onMouseLeave={handleMouseLeave}>
      <div ref={notificationRef} className="py-3.5 pl-6 pr-3.5 sm:p-3 bg-white sm:w-full grid grid-cols-2 sm:flex sm:flex-col gap-12 sm:gap-3.5 border-blue border ring-blue ring-[0.5px]">
        <H6 className="uppercase !leading-[1.25]">
          Всё о разблокировке <br className="sm:hidden" /> в Euroclear здесь
        </H6>

        <Button href="/euroclear" label="Узнать больше" className="sm:text-[2px] sm:mt-0 sm:py-1.5" />
      </div>
    </section>
  )
}
