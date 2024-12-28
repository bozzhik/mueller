import {defineField, defineType, Rule} from 'sanity'
import {FileStack} from 'lucide-react'

export const blog = defineType({
  name: 'blog',
  title: 'Блог (Euroclear)',
  icon: FileStack,
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
      name: 'date',
      title: 'Дата',
      type: 'string',
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
      date: 'date',
      image: 'image',
    },
    prepare(selection) {
      const {heading, caption, date, image} = selection
      return {
        title: heading,
        subtitle: `${date} | ${caption}`,
        media: image,
      }
    },
  },
})
