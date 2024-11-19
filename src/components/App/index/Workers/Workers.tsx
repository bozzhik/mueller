import {sanityFetch} from '@/sanity/lib/live'
import {WORKERS_QUERY} from '@/sanity/lib/queries'

import {WorkerModule} from './WorkerModule'

export default async function Workers() {
  const {data} = await sanityFetch({
    query: WORKERS_QUERY,
  })

  const workers = data.sort((a, b) => (a.id ?? 0) - (b.id ?? 0))

  return (
    <section data-section="workers-index">
      {workers.map((worker, index) => (
        // @ts-expect-error type generated with error
        <WorkerModule worker={worker} key={index} index={index} />
      ))}
    </section>
  )
}
