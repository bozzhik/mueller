import {sanityFetch} from '@/sanity/lib/live'
import {BLOG_ITEM_QUERY} from '#/src/sanity/lib/queries'

import {QueryParams} from 'next-sanity'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'
import {H2, H6} from '~/UI/Typography'

import Contacts from '~~/specialization/Contacts'

export default async function Page({params}: {params: Promise<QueryParams>}) {
  const {data: blog} = await sanityFetch({
    query: BLOG_ITEM_QUERY,
    params: await params,
  })

  if (!blog) {
    return notFound()
  }

  const {heading, date} = blog

  return (
    <Container>
      <div className="mt-14 px-7 sm:px-3">
        <div className="flex justify-between items-end">
          <H2>{heading}</H2>
          <H6>{date}</H6>
        </div>
      </div>

      <Contacts />
    </Container>
  )
}
