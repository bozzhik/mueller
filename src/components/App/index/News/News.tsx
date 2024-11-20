import Link from 'next/link'
import {H2, H4, H6} from '~/UI/Typography'

export default function News() {
  return (
    <section id="media" data-section="news-index">
      <div className="grid items-end grid-cols-3 px-8 py-12">
        <div className="col-span-2 space-y-4">
          <H6>Мы в сми</H6>
          <H2 className="leading-[1.2]">
            Освещение нашей деятельности <br /> и достижений в ведущих мировых СМИ.
          </H2>
        </div>

        <Link className="block duration-300 border-b-2 hover:border-transparent justify-self-end border-foreground" href="/news">
          <H4 className="leading-none uppercase font-kaius">Смотреть все</H4>
        </Link>
      </div>
    </section>
  )
}
