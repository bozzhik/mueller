import {sanityFetch} from '@/sanity/lib/live'
import {EUROCLEAR_QUERY} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'

import Hero from '~~/euroclear/Hero'
import Blog from '~~/euroclear/Blog/Blog'
import Contacts from '~~/specialization/Contacts'

export default async function EuroclearPage() {
  const {data} = await sanityFetch({
    query: EUROCLEAR_QUERY,
  })

  if (!data) {
    return notFound()
  }

  return (
    <Container>
      {/* @ts-expect-error: Sanity type issues */}
      <Hero data={data} />

      <Blog />
      <Contacts />
    </Container>
  )
}
