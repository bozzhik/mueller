import {defineType, defineField} from 'sanity'

export const specializationItem = defineType({
  name: 'specializationItem',
  title: 'Элемент специализации',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required().error('Заголовок обязателен.'),
    }),
    defineField({
      name: 'list',
      title: 'Список',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).error('Список должен содержать хотя бы один элемент.'),
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Изображение обязательно.'),
    }),
  ],
})
