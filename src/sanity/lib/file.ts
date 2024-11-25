import {client} from './client'
import {getFileAsset, SanityFileAsset} from '@sanity/asset-utils'

export function urlForFile(asset: SanityFileAsset | string): string {
  const fileAsset: SanityFileAsset = getFileAsset(asset, {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
  })
  return fileAsset.url
}
