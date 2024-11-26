import {sanityFetch} from '@/sanity/lib/live'
import {NEWS_QUERY} from '@/sanity/lib/queries'

import Container from '~/Global/Container'
import RunningLine from '~~/news/RunningLine'
import NewsGrid from '~~/index/News/NewsGrid'

export default async function MediaPage() {
  const {data} = await sanityFetch({
    query: NEWS_QUERY,
  })

  return (
    <Container>
      <RunningLine />
      <NewsGrid news={data} isIndex={false} />
    </Container>
  )
}
