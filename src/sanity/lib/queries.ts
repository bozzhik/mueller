import {defineQuery} from 'next-sanity'

export const DETAILS_QUERY = defineQuery(`*[_type == "detail"]{
  name, advantages, specialization, achievements
}`)

export const WORKERS_QUERY = defineQuery(`*[_type == "worker"]{
  id, name, position, honors, education, career, other, languages, image
}`)
