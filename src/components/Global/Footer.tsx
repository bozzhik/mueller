'use client'

import MuellerLogo from '$/logo.svg'
import {websitePaths} from '@/lib/constants'

import {useRef} from 'react'

import Image from 'next/image'
import Link from 'next/link'
import {SPAN} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'

export default function Footer() {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const websitePathsArray = Object.entries(websitePaths)
  const chunkSize = Math.ceil(websitePathsArray.length / 3)
  const chunks = Array.from({length: 3}, (_, i) => websitePathsArray.slice(i * chunkSize, i * chunkSize + chunkSize))

  let globalIndex = 0

  return (
    <footer className="grid grid-cols-4 border-t divide-x sm:flex sm:flex-col sm:gap-8 sm:pb-6 sm:divide-none divide-gray border-gray">
      <div className="flex flex-col justify-between col-span-1 p-6 sm:px-3 sm:pt-5 sm:pb-0 sm:gap-2">
        <Image src={MuellerLogo} className="object-contain w-[80%] sm:w-[66%]" alt="Mueller Wagner logo" />

        <SPAN className="sm:hidden text-gray-light">2024, все права защищены</SPAN>
      </div>

      <div className="grid grid-cols-3 col-span-3 gap-4 px-6 py-5 sm:gap-1.5 sm:px-3 sm:py-0 sm:grid-cols-1">
        {chunks.map((chunk, colIndex) => (
          <div className="flex flex-col gap-12 sm:gap-1.5" key={colIndex}>
            <div className="flex flex-col gap-2 xl:gap-1.5 sm:gap-1.5">
              {chunk.map(([key, label]) => {
                const currentIndex = globalIndex++

                if (!itemRefs.current[currentIndex]) {
                  itemRefs.current[currentIndex] = null
                }

                return (
                  <Link
                    ref={(el) => {
                      itemRefs.current[currentIndex] = el
                    }}
                    href={`/#${key}`}
                    className="w-fit"
                    key={key}
                  >
                    <HoverText triggerRef={{current: itemRefs.current[currentIndex]}}>
                      <SPAN>{label}</SPAN>
                    </HoverText>
                  </Link>
                )
              })}
            </div>

            {colIndex === 0 && (
              <div className="space-y-1.5">
                <Link href="/privacy-policy" className="block sm:hidden w-fit text-gray-light hover:border-gray-light">
                  <HoverText>
                    <SPAN>Политика конфиденциальности</SPAN>
                  </HoverText>
                </Link>

                <Link href="mailto:info@muellerwagner.ru" className="block sm:hidden w-fit text-gray-light hover:border-gray-light">
                  <HoverText>
                    <SPAN>info@muellerwagner.ru</SPAN>
                  </HoverText>
                </Link>
              </div>
            )}

            {colIndex === 1 && (
              <Link href="https://yandex.ru/maps/-/CHEARNn3" target="_blank">
                <SPAN className="text-base sm:hidden xl:text-sm text-gray-light hover:border-gray-light">БЦ &#34;Вивальди Плаза&#34; ул. Летниковская, 2 к.1, Москва, Россия, 115114</SPAN>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex-col hidden gap-8 px-3 sm:flex">
        <div className="flex flex-col gap-2.5">
          <HoverText>
            <Link href="/privacy-policy" className="text-gray-light border-gray-light w-fit">
              <SPAN>
                Политика <br /> конфиденциальности
              </SPAN>
            </Link>
          </HoverText>

          <HoverText>
            <Link href="mailto:info@muellerwagner.ru" className="text-gray-light border-gray-light w-fit">
              <SPAN>info@muellerwagner.ru</SPAN>
            </Link>
          </HoverText>
        </div>

        <div className="flex flex-col gap-1.5">
          <SPAN className="sm:text-sm text-gray-light">2024, все права защищены</SPAN>

          <Link href="https://yandex.ru/maps/-/CHEARNn3" target="_blank">
            <SPAN className="sm:text-sm text-gray-light">БЦ &#34;Вивальди Плаза&#34; ул. Летниковская, 2 к.1, Москва, Россия, 115114</SPAN>
          </Link>
        </div>
      </div>
    </footer>
  )
}
