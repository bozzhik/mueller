import {defineType, Rule} from 'sanity'
import {FileChartLine} from 'lucide-react'

export type TFileType = (typeof detailBlocks)[number]
const detailBlocks = ['Общая', 'Банки', 'Ценные бумаги', 'Международные сделки'] as const

const isAllowedValue = (value: unknown): value is TFileType => typeof value === 'string' && detailBlocks.includes(value as TFileType)

export const presentation = defineType({
  name: 'presentation',
  title: 'Презентации',
  icon: FileChartLine,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Область видимости',
      type: 'string',
      description: `Допустимые значения: ${detailBlocks.join(', ')}`,
      options: {
        list: detailBlocks.map((value) => ({title: value, value})),
      },
      validation: (rule: Rule) => rule.required().custom((value) => (isAllowedValue(value) ? true : 'Недопустимое значение!')),
    },
    {
      name: 'caption',
      title: 'Подпись',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'file',
      title: 'Файл',
      type: 'file',
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'caption',
    },
  },
})
