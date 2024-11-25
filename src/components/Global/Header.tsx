import {sanityFetch} from '@/sanity/lib/live'
import {PRESENTATIONS_QUERY} from '@/sanity/lib/queries'

import {DesktopHeader} from '~/Global/Header/DesktopHeader'
import {MobileHeader} from '~/Global/Header/MobileHeader'

export default async function Header() {
  const {data: presentations} = await sanityFetch({
    query: PRESENTATIONS_QUERY,
  })

  return (
    <div>
      <DesktopHeader action={presentations} />
      <MobileHeader />
    </div>
  )
}
