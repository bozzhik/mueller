import AdvantagesImage from '$/index/advantages.jpg'

import Image from 'next/image'
import {H2, H6, P} from '~/UI/Typography'

const advantagesData = {
  1: 'Возможность проведения встреч в России, Германии и на Кипре.',
  2: 'Возможность оплаты услуг по представлению интересов за рубежом на российский счёт в рублях.',
  3: 'В состав коллегии входят европейские адвокаты, что позволяет своими силами представлять интересы клиентов в судах и государственных органах в ЕС, Швейцарии и Лихтенштейне.',
  4: 'Независимость от санкционной политики и политической конъюнктуры международных юридических компаний.',
}

export default function Advantages() {
  return (
    <section data-section="advantages-index" className="relative grid grid-cols-2">
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

      <div className="h-screen">
        <Image className="block object-cover w-full h-full" src={AdvantagesImage} alt="" />
      </div>
    </section>
  )
}
