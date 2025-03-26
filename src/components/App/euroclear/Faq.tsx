'use client'

import {useRef} from 'react'

import Link from 'next/link'
import {H2, H3, H6} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'

const FaqData = {
  caption: 'FAQ',
  title: 'Главные ответы про разблокировку',
  link: 'https://t.me/sanctionsexplained/226',
  actionText: 'Ответы В Телеграм',
  actionButtonText: 'Перейти к публикации',
}

export default function Faq() {
  const linkRef = useRef<HTMLAnchorElement>(null)

  return (
    <section id="blog" data-section="blog-index" className="border-b border-gray">
      <div className="w-full h-8 sm:h-6 bg-blue"></div>

      <div className="grid grid-cols-2 sm:grid-cols-1 sm:gap-6 items-center p-8 sm:p-3 sm:pb-6">
        <div className=" space-y-3">
          <H6>{FaqData.caption}</H6>
          <H2 className="leading-[1.2]">{FaqData.title}</H2>
        </div>

        <Link ref={linkRef} href={FaqData.link} className="block h-fit sm:w-full ml-10 sm:m-0 mt-7 pt-5 sm:pt-4 pb-3.5 sm:pb-2 text-center text-white bg-blue">
          <HoverText triggerRef={linkRef}>
            <H3 className="text-2xl sm:text-lg mx-auto leading-tight w-fit">{FaqData.actionButtonText}</H3>
          </HoverText>
        </Link>
      </div>
    </section>
  )
}
