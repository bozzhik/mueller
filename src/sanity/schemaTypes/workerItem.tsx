import {defineField, defineType} from 'sanity'

export const workerItem = defineType({
  name: 'workerItem',
  title: 'Элемент сотрудника',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Элементы',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
