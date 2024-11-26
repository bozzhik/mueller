import {sanityFetch} from '@/sanity/lib/live'
import {SPECIALIZATIONS_QUERY} from '#/src/sanity/lib/queries'

import {QueryParams} from 'next-sanity'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'
import Contacts from '~~/index/Contacts'

import Hero from '~~/specialization/Hero'
import HeroExtra from '~~/specialization/HeroExtra'
import News from '~~/specialization/News'

export default async function Page({params}: {params: Promise<QueryParams>}) {
  const {data: specialization} = await sanityFetch({
    query: SPECIALIZATIONS_QUERY,
    params: await params,
  })

  if (!specialization) {
    return notFound()
  }

  const {heading, list, mentions, advantages, image} = specialization

  return (
    <Container>
      {advantages ? (
        /* @ts-expect-error: Sanity type issues */
        <HeroExtra heading={heading} list={list} advantages={advantages} image={image} />
      ) : (
        /* @ts-expect-error: Sanity type issues */
        <Hero heading={heading} list={list} image={image} />
      )}

      <News title={heading} feed_url={mentions} />
      <Contacts />
    </Container>
  )
}
