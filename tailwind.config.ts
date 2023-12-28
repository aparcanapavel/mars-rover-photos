import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadowColor: {
        white: 'rgba(255, 255, 255, 0.08)',
      },
      input: {
        'background-color': 'transparent',
      },
    },
    colors: {
      mainBG: '#181E26',
      cardBG: '#232C38', //#2B3440
      accent: {
        DEFAULT: '#516DA6',
        '100': 'white',
        '200': '#B3B3B3',
        '300': '#2C3B59',
      }
    }
  },
  plugins: [],
}
export default config
