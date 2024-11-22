import axios from 'axios'

import Container from '~/Global/Container'
import RunningLine from '~~/news/RunningLine'
import NewsGrid from '~~/index/News/NewsGrid'

type TFeedItem = {
  url: string
  title: string
  content_text: string
  image: {
    src: string
    alt: string
  }
}

export default async function MediaPage() {
  const rssFeedUrl = process.env.NEXT_PUBLIC_RSS_FEED_URL || 'https://rss.app/feeds/v1.1/5cDiZJxRvi4fcr5v.json'
  const {data} = await axios.get(rssFeedUrl)

  const news = data?.items.map((item: TFeedItem) => ({
    heading: item.title,
    caption: item.content_text,
    source: item.url,
    media: item.image
      ? {
          url: item.image,
          alt: item.title,
        }
      : null,
  }))

  return (
    <Container>
      <RunningLine />
      <NewsGrid news={news} cms={false} />
    </Container>
  )
}
