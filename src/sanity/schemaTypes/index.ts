import {type SchemaTypeDefinition} from 'sanity'
import {detail} from './detail'
import {specializationItem} from './specializationItem'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [detail, specializationItem],
}
