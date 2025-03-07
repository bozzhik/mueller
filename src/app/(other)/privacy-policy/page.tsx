import Container from '~/Global/Container'
import {H3, P} from '~/UI/Typography'

const Section = ({title, content}: {title: string; content: string[]}) => (
  <div>
    <H3 className="sm:text-xl">{title}</H3>
    <div className="">
      {content.map((text, index) => (
        <P key={index}>{text}</P>
      ))}
    </div>
  </div>
)

export default function PrivacyPolicyPage() {
  return (
    <Container className="border-b border-gray">
      <div className="w-[70%] sm:w-full sm:px-3 mx-auto pb-20 space-y-8 pt-14 sm:py-10">
        <H3 className="sm:text-xl">Политика конфиденциальности</H3>
        <P>Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем персональные данные пользователей, посещающих наш сайт.</P>

        <Section title="1. Сбор информации" content={['Личные данные, такие как имя, адрес электронной почты и номер телефона.', 'Данные о вашем взаимодействии с сайтом, включая IP-адрес и файлы cookie.', 'Информацию, предоставленную вами через формы обратной связи или регистрации.']} />
        <Section title="2. Использование данных" content={['Обеспечение работы сайта и улучшение его функциональности.', 'Связь с вами по вопросам, связанным с нашими услугами.', 'Персонализация пользовательского опыта.']} />
        <Section title="3. Передача данных третьим лицам" content={['Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.']} />
        <Section title="4. Защита данных" content={['Мы принимаем все необходимые меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.']} />
        <Section title="5. Использование файлов cookie" content={['Мы используем файлы cookie для улучшения функциональности сайта и анализа поведения пользователей. Вы можете управлять настройками cookie в своем браузере.']} />
        <Section title="6. Ваши права" content={['Получить доступ к своим данным.', 'Запросить их изменение или удаление.', 'Отозвать согласие на обработку данных.']} />
        <Section title="7. Контакты" content={[`Если у вас есть вопросы или жалобы, связанные с обработкой ваших данных, вы можете связаться с нами по адресу: info@muellerwagner.ru`]} />
      </div>
    </Container>
  )
}
