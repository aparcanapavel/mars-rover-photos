import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
    colors: {
      mainBG: '#181E26',
      cardBG: '#232C38', //#2B3440
      accent: {
        DEFAULT: '#516DA6',
        '100': '#4D818C',
        '200': '#4EA68D',
        '300': '#334568',
      }
    }
  },
  plugins: [],
}
export default config
