import TelegramLogo from '$/index/telegram.svg'

import Image from 'next/image'
import Link from 'next/link'
import {H2, H3, H6} from '~/UI/Typography'

export default function Blog() {
  return (
    <>
      <section id="blog" data-section="blog-index">
        <div className="w-full h-8 bg-blue"></div>

        <div className="grid grid-cols-4 divide-x divide-gray">
          <div className="self-end col-span-2 p-8 space-y-6">
            <H6>Блог</H6>
            <H2 className="leading-[1.2]">Подпишитесь на наш телеграм-канал «Санкционный дозор»</H2>
          </div>

          <div></div>

          <Link className="flex flex-col justify-between gap-20 p-8 xl:gap-14 group" href="https://t.me/sanctionsexplained" target="_blank">
            <Image className="w-12 xl:w-10 group-hover:scale-[1.07] duration-300" src={TelegramLogo} alt="Телеграм канал Санкционный дозор" />

            <H3 className="leading-[1.1] border-b-2 border-transparent group-hover:border-foreground w-fit duration-300">Telegram</H3>
          </Link>
        </div>
      </section>

      <section data-section="reach-index" className="text-white bg-blue group">
        <Link href="https://t.me/sanctionsexplained" className="grid grid-cols-4 pt-6 pb-5 xl:grid-cols-2">
          <H3 className="col-span-2 pr-20 xl:pr-0 xl:col-span-1 text-end">Cвязаться с нами</H3>

          <div className="col-start-4 pl-8 xl:pr-8 xl:col-start-2 xl:flex xl:justify-end">
            <H3 className="duration-300 border-b-2 border-transparent w-fit xl:text-end group-hover:border-white">@sanctionsexplained</H3>
          </div>
        </Link>
      </section>
    </>
  )
}
