import Image from 'next/image'
import {NEWS_QUERYResult} from '#/sanity.types'

type NewsItem = NEWS_QUERYResult[number]

export default function NewsGrid({news}: {news: NewsItem[]}) {
  return (
    <section data-section="news-grid" className="grid grid-cols-4 gap-4 p-4">
      {news.map((item) => (
        <article key={item.id} className="p-4 bg-white rounded shadow">
          {item.image?.asset && <Image src={`https://cdn.sanity.io/images/your-project-id/${item.image.asset._ref}`} alt={item.image.alt || item.heading || ''} width={300} height={200} className="mb-4 rounded" />}
          <h3 className="mb-2 text-lg font-bold">{item.heading}</h3>
          <p className="mb-4 text-sm text-gray-600">{item.caption}</p>
          <a href={item.source || '#'} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </article>
      ))}
    </section>
  )
}
