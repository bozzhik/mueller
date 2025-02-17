import {defineType} from 'sanity'

export const specializationItem = defineType({
  name: 'specializationItem',
  title: 'Элемент специализации',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required().error('Заголовок обязателен.'),
    },
    {
      name: 'list',
      title: 'Список',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).error('Список должен содержать хотя бы один элемент.'),
    },
    {
      name: 'mentions',
      title: 'Упоминания',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
      description: 'Ссылки на RSS Feed',
    },
    {
      name: 'advantages',
      title: 'Преиущества',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'icon',
      title: 'Иконка',
      type: 'image',
      validation: (Rule) => Rule.required().error('Иконка обязательна.'),
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Изображение обязательно.'),
    },
    {
      name: 'slug',
      title: 'Путь',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
