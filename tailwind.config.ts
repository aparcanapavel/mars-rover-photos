import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
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
      accent: {
        DEFAULT: '#516DA6',
        '100': 'white',
        '200': '#B3B3B3',
        '300': '#2C3B59',
      },
      cardBG: {
        DEFAULT: "#232c38",
        100: "#d3d5d7",
        200: "#a7abaf",
        300: "#7b8088",
        400: "#4f5660",
        600: "#1c232d",
        700: "#151a22",
        800: "#0e1216",
        900: "#07090b"
      },
    }
  },
  plugins: [],
}
export default config
