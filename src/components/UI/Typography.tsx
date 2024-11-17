import {cn} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

type TypoTypes = 'h1' | 'h2' | 'h6' | 'p'

export const typoClasses = {
  h1: 'text-8xl xl:text-[66px] sm:text-4xl uppercase font-kaius font-bold', // H1 96px
  h2: 'text-[44px] uppercase font-kaius font-bold', // H2 44px
  h6: 'text-2xl xl:text-xl sm:text-lg font-light font-playfair', // Subscript[1] 24px
  p: 'text-3xl xl:text-2xl sm:text-xl font-light font-playfair', // Paragraph 28px
}

function Typography({type, className, children}: Props) {
  const Element = type
  return <Element className={cn(typoClasses[type], className)}>{children}</Element>
}

const initElement = (type: TypoTypes) =>
  Object.assign(
    ({className, children}: Omit<Props, 'type'>) => (
      <Typography type={type} className={className}>
        {children}
      </Typography>
    ),
    {displayName: `Typography(${type.toUpperCase()})`},
  )

export const H1 = initElement('h1')
export const H2 = initElement('h2')
export const H6 = initElement('h6')
export const P = initElement('p')
