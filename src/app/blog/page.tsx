import {sanityFetch} from '@/sanity/lib/live'
import {BLOG_QUERY} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'
import RunningLine from '~~/news/RunningLine'
import BlogGrid from '~~/euroclear/Blog/BlogGrid'

export default async function BlogPage() {
  const {data} = await sanityFetch({
    query: BLOG_QUERY,
  })

  if (!data) {
    return notFound()
  }

  return (
    <Container>
      <RunningLine text="Блог Mueller Wagner" />
      <BlogGrid items={data} isEuroclear={false} />
    </Container>
  )
}
