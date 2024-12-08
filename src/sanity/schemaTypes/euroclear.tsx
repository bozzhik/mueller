import {defineType} from 'sanity'
import {StickyNote} from 'lucide-react'

export const euroclear = defineType({
  name: 'euroclear',
  title: 'Euroclear',
  icon: StickyNote,
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'action',
      title: 'Действие',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'achievements',
      title: 'Достижения',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'image',
    },
  },
})
