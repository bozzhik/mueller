import {NEWS_QUERYResult} from '#/sanity.types'
import {NewsCard} from '~~/index/News/NewsCard'

type NewsGridItem = {
  media?: {
    url: string
    alt: string
  }
} & NEWS_QUERYResult[number]

export default function NewsGrid({news, isIndex}: {news: NewsGridItem[]; isIndex: boolean}) {
  const displayedNews = news.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, isIndex ? 4 : news.length)

  return (
    <section data-section="news-grid" className="grid grid-cols-4 border-t sm:grid-cols-1 border-gray">
      {displayedNews.map((item, index) => (
        <NewsCard className={isIndex ? 'sm:[&:nth-of-type(3)]:hidden sm:[&:nth-of-type(4)]:hidden' : ''} cms={true} index={index} key={index} {...item} />
      ))}
    </section>
  )
}
