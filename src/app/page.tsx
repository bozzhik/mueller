import Container from '~/Global/Container'
import Hero from '~~/index/Hero'
import Details from '~~/index/Details/Details'
import Achievements from '~~/index/Achievements'
import Workers from '~~/index/Workers/Workers'
import Blog from '~~/index/Blog'
import News from '~~/index/News/News'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Details />
      <Achievements />
      <Workers />
      <Blog />
      <News />
    </Container>
  )
}
