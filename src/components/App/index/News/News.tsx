import {sanityFetch} from '@/sanity/lib/live'
import {NEWS_QUERY} from '@/sanity/lib/queries'

import Link from 'next/link'
import {H2, H4, H6} from '~/UI/Typography'
import NewsGrid from '~~/index/News/NewsGrid'

export default async function News() {
  const {data} = await sanityFetch({
    query: NEWS_QUERY,
  })

  return (
    <section id="media" data-section="news-index">
      <div className="grid items-end grid-cols-3 px-8 pt-12 pb-10 xl:py-10 xl:pb-8 sm:px-3 sm:pb-12 sm:grid-cols-1 sm:gap-4">
        <div className="col-span-2 space-y-3 sm:space-y-2">
          <H6>Мы в сми</H6>
          <H2 className="leading-[1.2]">
            Освещение нашей деятельности <br /> и достижений в ведущих мировых СМИ
          </H2>
        </div>

        <Link className="block mr-12 duration-300 border-b-2 sm:mr-0 sm:justify-self-start hover:border-transparent justify-self-end border-foreground" href="/media">
          <H4 className="leading-none uppercase font-kaius">Смотреть все</H4>
        </Link>
      </div>

      <NewsGrid news={data} isIndex={true} />
    </section>
  )
}
