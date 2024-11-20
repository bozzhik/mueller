import {NEWS_QUERYResult} from '#/sanity.types'
import {NewsCard} from './NewsCard'

export default function NewsGrid({news, sort}: {news: NEWS_QUERYResult; sort: boolean}) {
  const displayedNews = sort ? news.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)).slice(0, 4) : news.slice(0, 4)

  return (
    <section data-section="news-grid" className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 divide-x divide-gray border-t border-b border-gray">
      {displayedNews.map((item, index) => (
        <NewsCard key={index} {...item} />
      ))}
    </section>
  )
}
