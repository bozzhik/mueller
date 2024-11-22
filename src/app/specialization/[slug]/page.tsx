import {sanityFetch} from '@/sanity/lib/live'
import {SPECIALIZATIONS_QUERY} from '#/src/sanity/lib/queries'

import {QueryParams} from 'next-sanity'
import {notFound} from 'next/navigation'

import Container from '~/Global/Container'
import News from '~~/index/News/News'
import Contacts from '~~/index/Contacts'

import Hero from '~~/specialization/Hero'
import {P} from '~/UI/Typography'

export default async function Page({params}: {params: Promise<QueryParams>}) {
  const {data: specialization} = await sanityFetch({
    query: SPECIALIZATIONS_QUERY,
    params: await params,
  })

  if (!specialization) {
    return notFound()
  }

  const {heading, list, icon, image} = specialization

  return (
    <Container>
      {/* @ts-expect-error i think its because sanity new version has some bugs */}
      <Hero heading={heading} icon={icon} image={image} />

      <div className={`grid grid-cols-2 sm:grid-cols-1 sm:pb-1 divide-x sm:divide-y divide-gray border-t border-b border-gray ${list?.length && list.length > 2 && 'divide-y'}`}>
        {list?.map((item, idx) => (
          <div className="flex gap-8 sm:gap-6 items-center px-7 sm:px-4 pt-0 pb-4" key={idx}>
            <div className="text-[70px] xl:text-6xl s-fit leading-normal">{`${idx + 1}`}</div>
            <P className="pt-4">{`${item}`}</P>
          </div>
        ))}
      </div>

      <News />
      <Contacts />
    </Container>
  )
}
