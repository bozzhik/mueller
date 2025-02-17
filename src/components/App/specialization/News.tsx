import axios from 'axios'

import {H2, H6} from '~/UI/Typography'
import NewsGrid from '~~/specialization/NewsGrid'

type TFeedItem = {
  title: string
  content_text: string
  url: string
}

const WEBSITE_URL = process.env.NODE_ENV === 'production' ? 'https://muellerwagner.ru/' : 'http://localhost:2000'

export default async function News({feed_urls}: {feed_urls: string[] | null}) {
  if (!feed_urls || feed_urls.length === 0) return null

  let data

  try {
    if (feed_urls.length === 1) {
      const response = await axios.get(feed_urls[0])
      data = response.data
    } else {
      const response = await axios.post(`${WEBSITE_URL}/api/parser`, {urls: feed_urls})
      data = response.data
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    return null
  }

  const items: TFeedItem[] = Array.isArray(data) ? data : data?.items || []

  const news = items.map((item: TFeedItem) => ({
    heading: item.title,
    caption: item.content_text,
    source: item.url,
  }))

  return (
    <section data-section="news-specialization" className="border-b border-gray">
      <div className="grid items-end grid-cols-3 px-8 pt-12 pb-10 xl:py-10 xl:pb-8 sm:px-3 sm:pb-12 sm:grid-cols-1 sm:gap-4">
        <div className="col-span-2 space-y-3 sm:space-y-2">
          <H6>СМИ ПО ТЕМЕ</H6>
          <H2 className="leading-[1.2]">
            ЧИТАЙТЕ С НАМИ <br /> ПОСЛЕДНИЕ НОВОСТИ ПО СПЕЦИАЛИЗАЦИИ
          </H2>
        </div>
      </div>

      <NewsGrid news={news} />
    </section>
  )
}
