'use client'

import React, {useRef, useEffect} from 'react'
import {gsap} from 'gsap'

export default function HoverText({children}: {children: React.ReactNode}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const originalElement = container.children[0] as HTMLElement
    const clonedElement = container.children[1] as HTMLElement

    const splitText = (element: HTMLElement) => {
      const text = element.innerText
      element.innerHTML = ''

      return Array.from(text).map((char) => {
        const span = document.createElement('span')
        span.style.display = 'inline-block'
        if (char === ' ') {
          span.innerHTML = '&nbsp;'
        } else {
          span.textContent = char
        }
        element.appendChild(span)
        return span
      })
    }

    const originalChars = splitText(originalElement)
    const clonedChars = splitText(clonedElement)

    gsap.set(clonedChars, {yPercent: 100})

    const tl = gsap.timeline({paused: true})

    tl.to(originalChars, {
      yPercent: -100,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in',
    }).to(
      clonedChars,
      {
        yPercent: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.out',
      },
      '<0.15',
    )

    const handleMouseEnter = () => {
      tl.play()
    }

    const handleMouseLeave = () => {
      tl.reverse()
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative inline-block overflow-hidden">
      {children}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              className: `absolute top-0 left-0 ${child.props.className || ''}`,
            })
          : child,
      )}
    </div>
  )
}
