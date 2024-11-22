import {sanityFetch} from '@/sanity/lib/live'
import {SPECIALIZATIONS_QUERY} from '#/src/sanity/lib/queries'
import {QueryParams} from 'next-sanity'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'

export default async function Page({params}: {params: Promise<QueryParams>}) {
  const {data: specializations} = await sanityFetch({
    query: SPECIALIZATIONS_QUERY,
    params: await params,
  })

  if (!specializations || specializations.length === 0) {
    return notFound()
  }

  return (
    <Container>
      {specializations.map((item, index) => (
        <div className="space-y-4" key={index}>
          <h2>{item.heading || 'Без названия'}</h2>
          <p>Список: {item.list?.join(', ') || 'Нет данных'}</p>
        </div>
      ))}
    </Container>
  )
}
