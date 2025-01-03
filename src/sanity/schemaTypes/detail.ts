import {defineType, Rule} from 'sanity'
import {Layers} from 'lucide-react'
import {isDev} from 'sanity'

type TDetailType = (typeof detailBlocks)[number]
const detailBlocks = ['Преимущества', 'Специализация', 'Успехи'] as const

const isAllowedValue = (value: unknown): value is TDetailType => typeof value === 'string' && detailBlocks.includes(value as TDetailType)

export const detail = defineType({
  name: 'detail',
  title: 'Специализация, Успехи, Преимущества',
  type: 'document',
  icon: Layers,
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
