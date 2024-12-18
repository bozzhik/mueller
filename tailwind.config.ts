import type {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/lib/constants.ts'],
  theme: {
    screens: {
      xl: {max: '1780px'},
      lg: {max: '1280px'},
      // md: {max: '1024px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      playfair: ['var(--font-playfair-display)', ...fontFamily.serif],
      kaius: ['var(--font-kaius)', ...fontFamily.serif],
    },
    colors: {
      white: {
        DEFAULT: '#FFFFFF',
        dirty: '#FAFAFA',
      },
      gray: {
        DEFAULT: '#2F2F2F',
        light: '#878686',
      },
      foreground: '#242424',
      blue: '#282D37',
      transparent: 'transparent',
    },

    extend: {},
  },
  plugins: [
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
} satisfies Config
