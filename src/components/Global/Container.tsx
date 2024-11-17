import {cn} from '@/lib/utils'

type Props = {
  className?: string
  offset?: boolean
  children: React.ReactNode
}

const sitePadding = 'pt-[9vh] sm:pt-[6vh]'

export default function Container({className, offset = true, children}: Props) {
  return <main className={cn(offset && sitePadding, className)}>{children}</main>
}
