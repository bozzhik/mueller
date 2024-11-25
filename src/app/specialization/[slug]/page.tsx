import {sanityFetch} from '@/sanity/lib/live'
import {SPECIALIZATIONS_QUERY} from '#/src/sanity/lib/queries'

import {QueryParams} from 'next-sanity'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'
import News from '~~/index/News/News'
import Contacts from '~~/index/Contacts'

import Hero from '~~/specialization/Hero'

export default async function Page({params}: {params: Promise<QueryParams>}) {
  const {data: specialization} = await sanityFetch({
    query: SPECIALIZATIONS_QUERY,
    params: await params,
  })

  if (!specialization) {
    return notFound()
  }

  const {heading, list, image} = specialization

  return (
    <Container>
      {/* @ts-expect-error i think its because sanity new version has some bugs */}
      <Hero heading={heading} list={list} image={image} />

      <News />
      <Contacts />
    </Container>
  )
}
