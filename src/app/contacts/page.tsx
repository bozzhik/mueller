import Contacts from '#/src/components/App/index/Contacts'
import Container from '~/Global/Container'

export default function ContactsPage() {
  return (
    <Container className="border-b border-gray">
      <Contacts className="h-[78vh] sm:h-auto" />
    </Container>
  )
}
