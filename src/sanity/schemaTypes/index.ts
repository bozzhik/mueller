import {type SchemaTypeDefinition} from 'sanity'
import {detail} from './detail'
import {specializationItem} from './specializationItem'
import {worker} from './worker'
import {workerItem} from './workerItem'
import {news} from './news'
import {presentation} from './presentation'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [detail, specializationItem, worker, workerItem, news, presentation],
}
