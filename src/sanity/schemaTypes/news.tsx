import {defineField, defineType, Rule} from 'sanity'
import {Newspaper} from 'lucide-react'

export const news = defineType({
  name: 'news',
  title: 'Новости',
  icon: Newspaper,
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Заголовок',
      type: 'text',
      rows: 2,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'caption',
      title: 'Подпись к заголовку',
      type: 'text',
      rows: 5,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'publisher',
      title: 'Издатель',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'source',
      title: 'Источник',
      type: 'url',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Подпись к изображению',
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      caption: 'caption',
      publisher: 'publisher',
      id: 'id',
      image: 'image',
    },
    prepare(selection) {
      const {heading, caption, publisher, id, image} = selection
      return {
        title: `${id}. ${heading}`,
        subtitle: `${publisher} | ${caption}`,
        media: image,
      }
    },
  },
})
