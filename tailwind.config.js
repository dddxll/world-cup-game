export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: { DEFAULT: '#0D2818', light: '#1a4a2e', dark: '#081a0f' },
        gold: { DEFAULT: '#D4A843', light: '#e6c96a', dark: '#b8922e' },
      },
      maxWidth: { 'game': '480px' },
    },
  },
  plugins: [],
}
