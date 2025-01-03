import {sanityFetch} from '@/sanity/lib/live'
import {BLOG_QUERY} from '@/sanity/lib/queries'

import BlogGrid from '~~/euroclear/Blog/BlogGrid'

import Link from 'next/link'
import {H2, H4, H6} from '~/UI/Typography'
import HoverText from '~/UI/HoverText'

export default async function News() {
  const {data} = await sanityFetch({
    query: BLOG_QUERY,
  })

  return (
    <section data-section="blog-euroclear">
      <div className="grid items-end grid-cols-3 px-8 pt-12 pb-10 xl:py-10 xl:pb-8 sm:px-3 sm:pb-12 sm:grid-cols-1 sm:gap-4">
        <div className="col-span-2 space-y-3 sm:space-y-2">
          <H6>Наш блог о Euroclear</H6>
          <H2 className="leading-[1.2]">
            Следите за нашими последними <br /> публикациями на тему EUROCLEAR
          </H2>
        </div>

        <Link className="block mr-12 duration-300 border-b-2 sm:mr-0 sm:justify-self-start hover:border-transparent justify-self-end border-foreground" href="/blog">
          <HoverText>
            <H4 className="leading-none uppercase font-kaius">Смотреть все</H4>
          </HoverText>
        </Link>
      </div>

      <BlogGrid items={data} isEuroclear={true} />
    </section>
  )
}
