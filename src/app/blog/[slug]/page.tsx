import {sanityFetch} from '@/sanity/lib/live'
import {BLOG_ITEM_QUERY, BLOG_QUERY} from '#/src/sanity/lib/queries'
import type {Slug} from '#/sanity.types'

import {QueryParams} from 'next-sanity'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'
import BlogGrid from '~~/euroclear/Blog/BlogGrid'
import Contacts from '~~/specialization/Contacts'

import {H2, H6} from '~/UI/Typography'
import {PortableBlock} from '~/UI/PortableBlock'

async function getBlogItems({slug}: {slug: Slug}) {
  const {data: items} = await sanityFetch({
    query: BLOG_QUERY,
  })

  const filteredItems = items.filter((item) => item.slug?.current !== slug?.current) || []

  return filteredItems
}

export default async function BlogItemPage({params}: {params: Promise<QueryParams>}) {
  const {data: blog} = await sanityFetch({
    query: BLOG_ITEM_QUERY,
    params: await params,
  })

  if (!blog || !blog.slug?.current) {
    return notFound()
  }

  const {heading, date, content, slug} = blog

  const blogItems = await getBlogItems({slug})

  return (
    <Container>
      <div className="mt-14 sm:mt-7 px-7 sm:px-3 space-y-9 sm:space-y-5">
        <div className="flex sm:flex-col-reverse sm:items-start justify-between items-end">
          <H2 className="max-w-[50ch] leading-[1.2]">{heading}</H2>
          <H6>{date}</H6>
        </div>

        <PortableBlock className="max-w-[80ch] xl:max-w-[65ch]" value={content || []} />
      </div>

      <BlogGrid items={blogItems} isEuroclear={false} />

      <Contacts />
    </Container>
  )
}
