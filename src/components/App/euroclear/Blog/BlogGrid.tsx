import {BLOG_QUERYResult} from '#/sanity.types'
import {NewsCard} from '~~/index/News/NewsCard'

export default function BlogGrid({items, isEuroclear}: {items: BLOG_QUERYResult; isEuroclear: boolean}) {
  const displayedItems = items.slice(0, isEuroclear ? 4 : items.length)

  return (
    <section data-section="news-grid" className="grid grid-cols-4 border-t sm:grid-cols-1 border-gray">
      {displayedItems.map((item, index) => (
        <NewsCard type="blog" className={isEuroclear ? 'sm:[&:nth-of-type(3)]:hidden sm:[&:nth-of-type(4)]:hidden' : ''} cms={true} index={index} key={index} {...item} />
      ))}
    </section>
  )
}