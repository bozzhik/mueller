import Container from '~/Global/Container'
import Hero from '~~/index/Hero'
import Details from '~~/index/Details/Details'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Details />
    </Container>
  )
}
