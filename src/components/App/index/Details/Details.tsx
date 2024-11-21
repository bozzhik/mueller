import {sanityFetch} from '@/sanity/lib/live'
import {DETAILS_QUERY} from '@/sanity/lib/queries'

import DetailsModule from '~~/index/Details/DetailsModule'

export default async function Details() {
  const {data: details} = await sanityFetch({
    query: DETAILS_QUERY,
  })

  const advantagesData = details.find((item) => item.name === 'Преимущества')?.advantages || []
  const specializationData = details.find((item) => item.name === 'Специализация')?.specialization || []
  const achievementsData = details.find((item) => item.name === 'Успехи')?.achievements || []

  return <DetailsModule advantages={advantagesData} specialization={specializationData} achievements={achievementsData} />
}
