import {defineType, Rule} from 'sanity'
import {Text} from 'lucide-react'
import {isDev} from 'sanity'

export type TDetailType = 'Преимущества' | 'Специализация' | 'Успехи'
const detailBlocks: TDetailType[] = ['Преимущества', 'Специализация', 'Успехи']

const isAllowedValue = (value: unknown): value is TDetailType => typeof value === 'string' && detailBlocks.includes(value as TDetailType)

export const detail = defineType({
  name: 'detail',
  title: 'Детали',
  type: 'document',
  icon: Text,
  fields: [
    {
      name: 'name',
      title: 'Блок',
      type: 'string',
      description: `Допустимые значения: ${detailBlocks.join(', ')}`,
      options: {
        list: detailBlocks.map((value) => ({title: value, value})),
      },
      validation: (rule: Rule) => rule.required().custom((value) => (isAllowedValue(value) ? true : 'Недопустимое значение!')),
      readOnly: !isDev,
    },
    {
      name: 'advantages',
      title: 'Преимущества',
      type: 'array',
      of: [{type: 'text', rows: 5}],
      hidden: ({document}) => (document?.name as TDetailType) !== 'Преимущества',
    },
    {
      name: 'specialization',
      title: 'Специализация',
      type: 'array',
      of: [{type: 'specializationItem'}],
      hidden: ({document}) => (document?.name as TDetailType) !== 'Специализация',
    },
    {
      name: 'achievements',
      title: 'Успехи',
      type: 'array',
      of: [{type: 'text', rows: 5}],
      hidden: ({document}) => (document?.name as TDetailType) !== 'Успехи',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
