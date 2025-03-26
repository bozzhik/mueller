import Container from '~/Global/Container'

import Hero from '~~/index/Hero'
import Details from '~~/index/Details/Details'
import Workers from '~~/index/Workers/Workers'
import Blog from '~~/index/Blog'
import News from '~~/index/News/News'
import Contacts from '~~/index/Contacts'

export default function HomePage() {
  return (
    <>
      <Container>
        <Hero />
        <Details />
        <Workers />
        <Blog />
        <News />
        <Contacts />
      </Container>
    </>
  )
}
