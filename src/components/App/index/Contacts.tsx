import {H2, H4, H6} from '~/UI/Typography'
import ContactsForm from '~~/index/ContactsForm'

export default function Contacts() {
  return (
    <section id="contacts" data-section="contacts-index" className="border-b border-gray">
      <div className="grid grid-cols-2 px-7 py-10 sm:grid-cols-1 sm:gap-6 sm:px-3 xl:py-8 sm:pb-10">
        <div className="flex flex-col justify-between sm:gap-2.5">
          <H6 className="uppercase">Контакты</H6>

          <div className="space-y-2 sm:space-y-7">
            <H2>Свяжитесь с нами</H2>
            <H4 className="max-w-[35ch] !leading-[1.3]">Мы всегда рады ответить на ваши вопросы и обсудить возможное сотрудничество.</H4>
          </div>
        </div>

        <ContactsForm />
      </div>
    </section>
  )
}
