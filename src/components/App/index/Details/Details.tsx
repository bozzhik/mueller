import {Detail} from '#/sanity.types'
import {sanityFetch} from '@/sanity/lib/live'
import {DETAILS_QUERY} from '@/sanity/lib/queries'

import DetailsModule from '~~/index/Details/DetailsModule'

export default async function Details() {
  const {data: details}: {data: Detail[]} = await sanityFetch({
    query: DETAILS_QUERY,
  })

  const advantagesData = details.find((item: Detail) => item.name === 'Преимущества')?.advantages || []
  const specializationData = details.find((item: Detail) => item.name === 'Специализация')?.specialization || []

  return <DetailsModule advantages={advantagesData} specialization={specializationData} />
}
