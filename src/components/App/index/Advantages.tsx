'use client'

import AdvantagesImage from '$/index/advantages.jpg'
import DepositIcon from '$/index/success/deposit.svg'
import ChessPiecesIcon from '$/index/success/chess-pieces.svg'
import ChessBoardIcon from '$/index/success/chess-board.svg'

import {useEffect} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'

import Image from 'next/image'
import {H2, H3, H4, H6, P} from '~/UI/Typography'

const advantagesData = {
  1: 'Возможность проведения встреч в России, Германии и на Кипре.',
  2: 'Возможность оплаты услуг по представлению интересов за рубежом на российский счёт в рублях.',
  3: 'В состав коллегии входят европейские адвокаты, что позволяет своими силами представлять интересы клиентов в судах и государственных органах в ЕС, Швейцарии и Лихтенштейне.',
  4: 'Независимость от санкционной политики и политической конъюнктуры международных юридических компаний.',
}

const specializationData = {
  1: {
    heading: 'Банки',
    content: ['Поиск и разблокировка активов в европейских банках', 'Предъявление банковских гарантий'],
    image: DepositIcon,
  },
  2: {
    heading: 'Ценные бумаги',
    content: ['Разблокировка ценных бумаг у брокеров, депозитариев в ЕС, США и Швейцарии', 'Перевод ценных бумаг в Россию из зарубежных юрисдикций'],
    image: ChessPiecesIcon,
  },
  3: {
    heading: 'Международные сделки',
    content: ['Возврат предоплаты', 'Получение разрешений национальных регуляторов', 'Принуждение зарубежных контрагентов к выполнению договоров.'],
    image: ChessBoardIcon,
  },
}

export default function Advantages() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to('[data-gsap="fixed-image"]', {
      scrollTrigger: {
        trigger: '[data-gsap="fixed-image"]', // When the section containing the image enters the viewport
        start: 'top top', // When the top of the section reaches the top of the viewport
        end: 'bottom center', // When the bottom of the section reaches the top of the viewport
        pin: true, // Pin the image for the duration of the section
        scrub: true, // Allow smooth scrolling
        markers: false, // Scroll markers (dev)
        pinSpacing: false, // I disabled this shit because it added some fucking element with a random padding
      },
    })
  }, [])

  return (
    <section data-section="advantages-index" className="relative grid grid-cols-2 sm:grid-cols-1">
      <div>
        <div>
          <div className="py-10 text-white sm:px-5 sm:py-4 xl:py-8 px-7 bg-blue">
            <H2 className="sm:max-w-[20ch]">НАШИ ПРЕИМУЩЕСТВА</H2>
          </div>

          <div className="divide-y divide-gray">
            {Object.entries(advantagesData).map(([key, value]) => (
              <div key={key} className="flex px-10 sm:pl-3 sm:pr-6 gap-7 xl:gap-6 py-14 xl:py-10 sm:py-7">
                <H6 className="text-3xl !leading-none xl:text-2xl sm:text-xl">{key}</H6>
                <P className="uppercase">{value}</P>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[40vh] hidden sm:block">
          <Image className="block object-cover w-full h-full" src={AdvantagesImage} alt="" />
        </div>

        <div>
          <div className="py-10 text-white sm:px-5 sm:py-4 xl:py-8 px-7 bg-blue">
            <H2 className="sm:max-w-[20ch]">НАША СПЕЦИАЛИЗАЦИЯ</H2>
          </div>

          <div className="divide-y divide-gray">
            {Object.entries(specializationData).map(([key, {heading, content, image}]) => (
              <div key={key} className="flex items-start gap-10 px-10 sm:gap-7 sm:pl-3 sm:pr-6 sm:flex-col py-14 xl:py-10 sm:py-7">
                <div className="s-32 xl:s-20 sm:s-16">
                  <Image className="block object-contain w-full h-full" src={image} alt={heading} />
                </div>

                <div className="sm:space-y-1">
                  <H3>{heading}</H3>

                  <div className="space-y-4 divide-y sm:space-y-3 divide-gray sm:divide-gray/30">
                    {content.map((item, index) => (
                      <H4 className="uppercase max-w-[40ch] pt-4 sm:pt-2.5" key={index}>
                        {item}
                      </H4>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div data-gsap="fixed-image" className="sm:hidden">
        <Image className="block object-cover w-full h-screen" src={AdvantagesImage} alt="" />
      </div>
    </section>
  )
}
