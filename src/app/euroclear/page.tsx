import EuroclearImage from '$/euroclear.jpg'

import Container from '~/Global/Container'

import Hero from '~~/euroclear/Hero'
import Contacts from '~~/specialization/Contacts'

const euroclearData = {
  heading: 'Euroclear',
  action: 'Успешно помогаем в получении лицензий на разблокировку активов в Euroclear и Clearstream для граждан РФ с ВНЖ в ЕС и без ВНЖ в ЕС',
  achievements: ['Получено более 40 лицензий', 'Процент одобрения заявок по Euroclear - 90%', 'получены лицензии для граждан РФ без ВНЖ в ЕС', 'Получены лицензии для юридических лиц', 'Получены лицензии для резидентов ЕС, получивших активы по договору дарения'],
  image: EuroclearImage,
}

export type TEuroclearData = typeof euroclearData

export default function EuroclearPage() {
  return (
    <Container>
      <Hero data={euroclearData} />

      <Contacts />
    </Container>
  )
}
