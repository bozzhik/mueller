import AdvantagesImage from '$/index/advantages.jpg'
import DepositIcon from '$/index/success/deposit.svg'
import ChessPiecesIcon from '$/index/success/chess-pieces.svg'
import ChessBoardIcon from '$/index/success/chess-board.svg'

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
  return (
    <section data-section="advantages-index" className="relative grid grid-cols-2">
      <div>
        <div>
          <div className="py-10 text-white px-7 bg-blue">
            <H2>НАШИ ПРЕИМУЩЕСТВА</H2>
          </div>

          <div className="divide-y divide-gray">
            {Object.entries(advantagesData).map(([key, value]) => (
              <div key={key} className="flex px-10 gap-7 py-14">
                <H6 className="text-3xl leading-none">{key}</H6>
                <P className="uppercase">{value}</P>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="py-10 text-white px-7 bg-blue">
            <H2>НАША СПЕЦИАЛИЗАЦИЯ</H2>
          </div>

          <div className="divide-y divide-gray">
            {Object.entries(specializationData).map(([key, {heading, content, image}]) => (
              <div key={key} className="flex items-start gap-10 px-10 py-14">
                <div>
                  <Image className="block object-contain w-full h-full" src={image} alt={heading} />
                </div>

                <div className="space-y-0">
                  <H3>{heading}</H3>

                  <div className="space-y-4 divide-y divide-gray">
                    {content.map((item, index) => (
                      <H4 className="uppercase max-w-[40ch] pt-4" key={index}>
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

      <div className="h-screen">
        <Image className="block object-cover w-full h-full" src={AdvantagesImage} alt="" />
      </div>
    </section>
  )
}
