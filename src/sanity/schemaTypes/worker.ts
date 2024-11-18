import {defineField, defineType, Rule} from 'sanity'
import {Users} from 'lucide-react'

export const worker = defineType({
  name: 'worker',
  title: 'Сотрудники',
  icon: Users,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Имя и фамилия',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'position',
      title: 'Должность',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'honors',
      title: 'Достижения',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'education',
      title: 'Образование',
      type: 'array',
      of: [{type: 'workerItem'}],
      validation: (rule: Rule) => rule.required(),
    },
    defineField({
      name: 'career',
      title: 'Карьера',
      type: 'array',
      of: [{type: 'workerItem'}],
    }),
    defineField({
      name: 'other',
      title: 'Другое',
      type: 'array',
      of: [{type: 'workerItem'}],
    }),
    {
      name: 'languages',
      title: 'Языки',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})
