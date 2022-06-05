module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['"IBM Plex Sans"', 'sans-serif']
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      primary: {
        50: '#e9f3fc',
        100: '#bddaf5',
        200: '#91c1ee',
        300: '#64a8e7',
        400: '#3890e0',
        500: '#1f76c7',
        600: '#185c9b',
        700: '#11426e',
        800: '#0a2742',
        900: '#030d16'
      },
      secondary: {
        50: '#E8DEFF',
        100: '#D9C7FF',
        200: '#B999FF',
        300: '#9A6BFF',
        400: '#7A3DFF',
        500: '#5B0FFF',
        600: '#4A00EB',
        700: '#3E00C7',
        800: '#3400A3',
        900: '#28007F'
      },
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717'
      },
      red: {
        50: '#FFF2F2',
        100: '#FFE6E6',
        200: '#FFBFBF',
        300: '#FF9999',
        500: '#FF0000',
        600: '#E60000'
      },
      orange: {
        50: '#FFFAF4',
        100: '#FFF5EA',
        200: '#FFE5CA',
        300: '#FFD5A9',
        500: '#FF9629',
        600: '#E68725'
      },
      green: {
        50: '#F2FBF4',
        100: '#E6F7E8',
        200: '#C0ECC6',
        300: '#9AE1A4',
        500: '#02B31B',
        600: '#02A118'
      },
      blue: {
        50: '#F7FBFE',
        100: '#EFF6FD',
        200: '#D6EAF9',
        500: '#5AA9E6',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
