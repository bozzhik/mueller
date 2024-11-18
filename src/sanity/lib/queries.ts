import {defineQuery} from 'next-sanity'

export const DETAILS_QUERY = defineQuery(`*[_type == "detail"]{
  _id, name, advantages, specialization, achievements
}`)

export const WORKER_QUERY = defineQuery(`*[_type == "worker"]{
  _id, name, position, honors, education, career, other, languages, image
}`)
