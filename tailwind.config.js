module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"EB Garamond"', 'serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'da-bg': '#050608',
        'da-deep-blue': '#071d3f',
        'da-deep-green': '#0b3a2b',
        'da-deep-brown': '#2b180f',
        'da-silver': '#bfc8c8',
        'da-gold': '#bfa05a'
      }
    }
  },
  plugins: [],
}
