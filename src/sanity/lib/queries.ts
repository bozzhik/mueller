import {defineQuery} from 'next-sanity'

export const DETAILS_QUERY = defineQuery(`
  *[_type == "detail"]{
    name, advantages, specialization, achievements
}`)

export const SPECIALIZATIONS_QUERY = defineQuery(`
  *[_type == "detail" && name == 'Специализация']{
    specialization[slug == $slug][0] {
      _type, heading, list, icon, image, slug
    }
  }[0].specialization
`)

export const WORKERS_QUERY = defineQuery(`
  *[_type == "worker"]{
    id, name, position, honors, education, career, other, image
}`)

export const NEWS_QUERY = defineQuery(`
  *[_type == "news"]{
    id, heading, caption, publisher, source, image
}`)
