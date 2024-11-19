import Container from '~/Global/Container'
import Hero from '~~/index/Hero'
import Details from '~~/index/Details/Details'
import Achievements from '~~/index/Achievements'
import Workers from '~~/index/Workers/Workers'
import Blog from '~~/index/Blog'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Details />
      <Achievements />
      <Workers />
      <Blog />
    </Container>
  )
}
