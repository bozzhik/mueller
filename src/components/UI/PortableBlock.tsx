import type {BLOG_ITEM_QUERYResult} from '#/sanity.types'

import {cn} from '@/lib/utils'
import {PortableText} from '@portabletext/react'

import {typoClasses} from '~/UI/Typography'

export type Props = NonNullable<NonNullable<BLOG_ITEM_QUERYResult>['content']>[number]

export function PortableBlock({value, className}: {value: Props[]; className?: string}) {
  return (
    <div className={cn(typoClasses.p, 'space-y-7 pb-14 max-w-[80ch]', className)}>
      <PortableText value={value} />
    </div>
  )
}
