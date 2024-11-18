import {type SchemaTypeDefinition} from 'sanity'
import {detail} from './detail'
import {specializationItem} from './specializationItem'
import {worker} from './worker'
import {workerItem} from './workerItem'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [detail, specializationItem, worker, workerItem],
}
