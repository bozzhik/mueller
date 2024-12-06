import EuroclearImage from '$/euroclear.jpg'

import Container from '~/Global/Container'

import Hero from '~~/euroclear/Hero'
import Contacts from '~~/specialization/Contacts'

const euroclearData = {
  heading: 'Euroclear',
  list: ['Обладаем лицензией на оказание юридической помощи российским физическим лицам, включая тех, кто имеет или не имеет вид на жительство в ЕС, при работе с Euroclear.', 'Сопровождаем резидентов ЕС в оформлении активов, полученных по договору дарения от граждан РФ, с учетом международного законодательства.', 'Предоставляем иностранным гражданам юридическую поддержку для работы с системой Euroclear и решения их финансовых вопросов.', 'Помогаем российским компаниям эффективно взаимодействовать с Euroclear, обеспечивая полное юридическое сопровождение.', 'Оказываем поддержку в переносе активов в финансовые юрисдикции ЕС, Швейцарии и США'],
  achievements: ['Получено более 40 лицензий на разблокировку активов в Euroclear/Clearstream', 'Процент одобрения заявок по Euroclear - 90%'],

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
