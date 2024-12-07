'use client'

import {NEWS_QUERYResult} from '#/sanity.types'
import {useMediaQuery} from '#/src/hooks/useMediaQuery'
import {NewsCard} from '~~/index/News/NewsCard'

type NewsGridItem = {
  media?: {
    url: string
    alt: string
  }
} & NEWS_QUERYResult[number]

export default function NewsGrid({news}: {news: NewsGridItem[]}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const displayedNews = isDesktop ? news.slice(0, 12) : news.slice(0, 4)

  return (
    <section data-section="news-grid" className="grid grid-cols-4 border-t xl:grid-cols-3 sm:grid-cols-1 border-gray">
      {displayedNews.map((item, index) => (
        <NewsCard cms={false} index={index} key={index} {...item} />
      ))}
    </section>
  )
}
