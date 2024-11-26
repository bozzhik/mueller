import axios from 'axios'

import {H2, H6} from '~/UI/Typography'
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

export default async function News({title, feed_url}: {title: string | null; feed_url: string | null}) {
  const safeFeedUrl = feed_url || ''

  const {data} = await axios.get(safeFeedUrl)

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
    <section data-section="news-specialization" className="border-b border-gray">
      <div className="grid items-end grid-cols-3 px-8 pt-12 pb-10 xl:py-10 xl:pb-8 sm:px-3 sm:pb-12 sm:grid-cols-1 sm:gap-4">
        <div className="col-span-2 space-y-3 sm:space-y-2">
          <H6>СМИ по теме</H6>
          <H2 className="leading-[1.2]">
            Читайте вместе с нами последние новости <br /> по специализации &quot;{title}&quot;.
          </H2>
        </div>
      </div>

      <NewsGrid news={news} />
    </section>
  )
}
