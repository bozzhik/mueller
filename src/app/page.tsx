import Container from '~/Global/Container'
import Loader from '~/Global/Loader'

import Hero from '~~/index/Hero'
import Details from '~~/index/Details/Details'
import Workers from '~~/index/Workers/Workers'
import Blog from '~~/index/Blog'
import News from '~~/index/News/News'
import Contacts from '~~/index/Contacts'

import ImageShader from '~/UI/ImageShader'
import SomeImage from '$/euroclear.jpg'

export default function HomePage() {
  return (
    <>
      <Loader />
      <Container>
        <Hero />
        <ImageShader src={SomeImage} alt="Shader Effect Example" className="custom-class" />
        <Details />
        <Workers />
        <Blog />
        <News />
        <Contacts />
      </Container>
    </>
  )
}
