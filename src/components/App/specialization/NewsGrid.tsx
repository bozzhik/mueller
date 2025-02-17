'use client'

import {useMediaQuery} from '#/src/hooks/useMediaQuery'
import {NewsCard} from '~~/specialization/NewsCard'

export type TNewsGridItem = {
  heading: string
  caption: string
  source: string
}

export default function NewsGrid({news}: {news: TNewsGridItem[]}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const displayedNews = isDesktop ? news : news.slice(0, 4)

  return (
    <section data-section="news-grid" className="grid grid-cols-4 border-t xl:grid-cols-3 sm:grid-cols-1 border-gray">
      {displayedNews.map((item, index) => (
        <NewsCard index={index} key={index} {...item} />
      ))}
    </section>
  )
}
