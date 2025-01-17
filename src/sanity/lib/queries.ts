import {defineQuery} from 'next-sanity'

export const DETAILS_QUERY = defineQuery(`
  *[_type == "detail"]{
    name, advantages, specialization, achievements
}`)

export const SPECIALIZATIONS_QUERY = defineQuery(`
  *[_type == "detail" && name == 'Специализация']{
    specialization[slug == $slug][0] {
      _type, heading, list, mentions, advantages, icon, image, slug
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

export const BLOG_QUERY = defineQuery(`
  *[_type == "blog"]{
    heading, caption, date, slug, image
}`)

export const BLOG_ITEM_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] { 
    heading, date, slug, content
  }
`)

export const PRESENTATIONS_QUERY = defineQuery(`
  *[_type == "presentation"]{
    name, caption, file
}`)

export const EUROCLEAR_QUERY = defineQuery(`
  *[_type == "euroclear"][0]{
      heading, action, achievements, image
    }
`)
