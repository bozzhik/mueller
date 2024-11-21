import {H2, H4, H6} from '~/UI/Typography'

export default function Contacts() {
  return (
    <section id="contacts" data-section="contacts-index" className="border-b border-gray">
      <div className="grid grid-cols-2 p-10 sm:px-5 sm:py-4 xl:py-8">
        <div className="flex flex-col justify-between">
          <H6 className="uppercase">Контакты</H6>

          <div className="space-y-2">
            <H2>Свяжитесь с нами</H2>
            <H4 className="max-w-[35ch] !leading-[1.3]">Мы всегда рады ответить на ваши вопросы и обсудить возможное сотрудничество.</H4>
          </div>
        </div>

        <mark>form</mark>
      </div>
    </section>
  )
}
