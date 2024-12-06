import {cn} from '#/src/lib/utils'

import {H2, H4, H6} from '~/UI/Typography'
import ContactsForm from '~~/index/ContactsForm'

export default function Contacts({className}: {className?: string}) {
  return (
    <section id="contacts" data-section="contacts-index">
      <div className={cn('grid grid-cols-2 py-10 px-7 sm:grid-cols-1 sm:gap-6 sm:px-3 xl:py-8 sm:pb-10', className)}>
        <div className="flex flex-col justify-between sm:gap-2.5">
          <H6 className="uppercase">Заявка</H6>

          <div className="space-y-2 sm:space-y-7">
            <H2>Заполните форму заявки</H2>
            <H4 className="max-w-[50ch] !leading-[1.3]">После получения заявки мы свяжемся с Вами.</H4>
          </div>
        </div>

        <ContactsForm />
      </div>
    </section>
  )
}
