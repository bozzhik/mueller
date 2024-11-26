'use client'

import {NEWS_QUERYResult} from '#/sanity.types'

import {useState, useEffect, useCallback} from 'react'
import {NewsCard} from '~~/index/News/NewsCard'

type NewsGridItem = {
  media?: {
    url: string
    alt: string
  }
} & NEWS_QUERYResult[number]

export default function NewsGrid({news}: {news: NewsGridItem[]}) {
  const [displayedNews, setDisplayedNews] = useState<NewsGridItem[]>([])
  const [itemsToLoad, setItemsToLoad] = useState(8)

  const handleScroll = useCallback(() => {
    const buffer = 800
    const bottomReached = window.innerHeight + window.scrollY + buffer >= document.body.offsetHeight

    if (bottomReached) {
      setItemsToLoad((prev) => prev + 8)
    }
  }, [])

  useEffect(() => {
    setDisplayedNews(news.slice(0, itemsToLoad))
  }, [itemsToLoad, news])

  useEffect(() => {
    const optimizedHandleScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', optimizedHandleScroll)

    return () => {
      window.removeEventListener('scroll', optimizedHandleScroll)
    }
  }, [handleScroll])

  return (
    <section data-section="news-grid" className="grid grid-cols-4 border-t xl:grid-cols-3 sm:grid-cols-1 border-gray">
      {displayedNews.map((item, index) => (
        <NewsCard cms={false} key={index} {...item} />
      ))}
    </section>
  )
}
