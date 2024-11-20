'use client'

import {useState, useEffect, useCallback} from 'react'
import {NEWS_QUERYResult} from '#/sanity.types'
import {NewsCard} from '~~/index/News/NewsCard'

type NewsGridItem = {
  media?: {
    url: string
    alt: string
  }
} & NEWS_QUERYResult[number]

export default function NewsGrid({news, cms}: {news: NewsGridItem[]; cms: boolean}) {
  const [displayedNews, setDisplayedNews] = useState<NewsGridItem[]>([])
  const [itemsToLoad, setItemsToLoad] = useState(8) // Number of items to load per scroll

  useEffect(() => {
    if (cms) {
      setDisplayedNews(news.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)).slice(0, 4))
    } else {
      setDisplayedNews(news.slice(0, itemsToLoad))
    }
  }, [news, cms, itemsToLoad])

  const handleScroll = useCallback(() => {
    if (cms) return

    const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight
    if (bottomReached) {
      setItemsToLoad((prev) => prev + 8)
    }
  }, [cms])

  useEffect(() => {
    if (!cms) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (!cms) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [cms, handleScroll])

  return (
    <section data-section="news-grid" className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 border-t border-gray">
      {displayedNews.map((item, index) => (
        <NewsCard key={index} cms={cms} {...item} />
      ))}
    </section>
  )
}
