/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // Inter is loaded per-weight as separate families (see app/_layout.tsx).
        // `font-bold` etc. only set fontWeight, which React Native won't map onto
        // a custom family — so use these explicit classes for weighted Inter.
        sans: ['Inter_400Regular', 'sans-serif'],
        inter: ['Inter_400Regular', 'sans-serif'],
        'inter-medium': ['Inter_500Medium', 'sans-serif'],
        'inter-semibold': ['Inter_600SemiBold', 'sans-serif'],
        'inter-bold': ['Inter_700Bold', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0B2A6B',
          dark: '#071E4D',
        },
        accent: '#F4B400',
        campus: {
          blue: '#0B2A6B',
          green: '#34A853',
          gold: '#F4B400',
        },
      },
    },
  },
  plugins: [],
};
