import Container from '~/Global/Container'
import Hero from '~~/index/Hero'
import Details from '~~/index/Details/Details'
import Achievements from '~~/index/Achievements'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Details />
      <Achievements />
    </Container>
  )
}
