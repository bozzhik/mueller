import {cn} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

type TypoTypes = 'h1' | 'p'

export const typoClasses = {
  h1: 'text-8xl uppercase font-kaius font-bold', // H1 96px
  p: 'text-3xl font-light font-playfair', // Paragraph 28px
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
export const P = initElement('p')
