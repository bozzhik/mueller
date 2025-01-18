import {PRESENTATIONS_QUERYResult} from '#/sanity.types'
import {sanityFetch} from '@/sanity/lib/live'
import {PRESENTATIONS_QUERY} from '@/sanity/lib/queries'

import {DesktopHeader} from '~/Global/Header/DesktopHeader'
import {MobileHeader} from '~/Global/Header/MobileHeader'

export type PRESENTATIONS_QUERYResultItem = PRESENTATIONS_QUERYResult[number]

export type PresentationData = {
  presentation: PRESENTATIONS_QUERYResultItem
  name: string
}

export default async function Header() {
  const {data: presentations} = await sanityFetch({
    query: PRESENTATIONS_QUERY,
  })

  const generalPresentation = presentations.find((p: PRESENTATIONS_QUERYResultItem) => p.name === 'Общая')
  const securitiesPresentation = presentations.find((p: PRESENTATIONS_QUERYResultItem) => p.name === 'Ценные бумаги')

  if (!generalPresentation || !securitiesPresentation) return null

  const presentationsData: PresentationData[] = [
    {presentation: generalPresentation, name: 'Общая'},
    {presentation: securitiesPresentation, name: 'Ценные бумаги'},
  ]

  return (
    <div>
      <DesktopHeader presentationsData={presentationsData} />
      <MobileHeader presentationsData={presentationsData} />
    </div>
  )
}
