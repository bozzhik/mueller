import {sanityFetch} from '@/sanity/lib/live'
import {EUROCLEAR_QUERY, PRESENTATIONS_QUERY} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'

import Hero from '~~/euroclear/Hero'
import Blog from '~~/euroclear/Blog/Blog'
import Contacts from '~~/specialization/Contacts'
import Faq from '~~/euroclear/Faq'

export default async function EuroclearPage() {
  const {data: euroclear} = await sanityFetch({
    query: EUROCLEAR_QUERY,
  })

  const {data: presentations} = await sanityFetch({
    query: PRESENTATIONS_QUERY,
  })

  if (!euroclear || !presentations) {
    return notFound()
  }

  const euroclearPresentation = presentations.find(({name}) => name === 'Ценные бумаги')

  return (
    <Container>
      {/* @ts-expect-error: Sanity type issues */}
      <Hero data={euroclear} presentation={euroclearPresentation} />

      <Faq />
      <Blog />
      <Contacts />
    </Container>
  )
}
