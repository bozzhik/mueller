import {defineQuery} from 'next-sanity'

export const DETAILS_QUERY = defineQuery(`*[_type == "detail"]{
  _id, name, advantages, specialization, achievements
}`)
