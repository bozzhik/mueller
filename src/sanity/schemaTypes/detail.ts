import {Rule, SchemaTypeDefinition} from 'sanity'
import {isDev} from 'sanity'

type TDetailType = 'Преимущества' | 'Специализация' | 'Успехи'
const detailBlocks: TDetailType[] = ['Преимущества', 'Специализация', 'Успехи']

const isAllowedValue = (value: unknown): value is TDetailType => typeof value === 'string' && detailBlocks.includes(value as TDetailType)

export const detail: SchemaTypeDefinition = {
  name: 'detail',
  title: 'Детали',
  type: 'document',
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
      of: [{type: 'text'}],
      hidden: ({document}) => (document?.name as TDetailType) !== 'Преимущества',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}
