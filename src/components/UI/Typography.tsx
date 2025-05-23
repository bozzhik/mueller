import {cn} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: 'text-8xl xl:text-[66px] sm:text-4xl uppercase font-bold font-kaius', // H1 96px
  h2: 'text-[44px] xl:text-3xl sm:text-2xl uppercase font-bold font-kaius', // H2 44px
  h3: 'text-[28px] sm:text-[26px] sm:leading-[1.2] uppercase font-bold font-kaius', // H3 28px

  h4: 'text-2xl xl:text-xl font-playfair', // H3 24px
  h6: 'text-[26px] xl:text-[22px] sm:text-lg font-light font-playfair', // Subscript[1] 24px
  p: 'text-3xl xl:text-2xl sm:text-xl font-light font-playfair', // Paragraph 28px
  span: 'text-xl xl:text-base uppercase font-light font-playfair', // Link 18px
} as const

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
export const H3 = initElement('h3')
export const H4 = initElement('h4')
export const H6 = initElement('h6')
export const P = initElement('p')
export const SPAN = initElement('span')
