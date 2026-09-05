/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void:    { 950: '#04010E', 900: '#070118', 800: '#0A0125', 700: '#0F0235' },
        violet:  { 300: '#C4B5FD', 400: '#A78BFA', 500: '#9B7EFF', 600: '#7C5CFC', 700: '#6D28D9' },
        fuchsia: { 400: '#E879F9', 500: '#D946EF' },
        ink:     { 100: '#EDE8FF', 200: '#D4CCFF', 300: '#B8A5FF', 400: '#9B7EFF' },
      },
  fontFamily: {
  display:  ['"Syne"', 'sans-serif'],
  body:     ['"Inter"', 'sans-serif'],
  serif:    ['"Playfair Display"', 'serif'],
},
fontSize: {
  'hero':    ['clamp(2.2rem, 4.5vw, 3.8rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
  'display': ['clamp(1.8rem, 3.5vw, 2.8rem)', { lineHeight: '1.12', letterSpacing: '-0.005em' }],
},
      animation: {
        'spin-slow':   'spin 40s linear infinite',
        'spin-med':    'spin 25s linear infinite reverse',
        'spin-fast':   'spin 16s linear infinite',
        'float-up':    'floatUp 6s ease-in-out infinite',
        'float-down':  'floatDown 7s ease-in-out infinite',
        'breathe':     'breathe 4s ease-in-out infinite',
        'twinkle':     'twinkle 3s ease-in-out infinite',
        'fade-up':     'fadeUp 0.8s ease-out forwards',
        'marquee':     'marquee 30s linear infinite',
        'bubble-l':    'bubbleL 6s ease-in-out infinite',
        'bubble-r':    'bubbleR 7s ease-in-out infinite',
      },
      keyframes: {
        floatUp:   { '0%,100%': { transform: 'translateY(0px)' },   '50%': { transform: 'translateY(-14px)' } },
        floatDown: { '0%,100%': { transform: 'translateY(0px)' },   '50%': { transform: 'translateY(10px)'  } },
        breathe:   { '0%,100%': { transform: 'scale(1)', opacity: '0.6' }, '50%': { transform: 'scale(1.15)', opacity: '1' } },
        twinkle:   { '0%,100%': { opacity: '0.1' }, '50%': { opacity: '0.8' } },
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        bubbleL:   { '0%,100%': { transform: 'translateY(0px) translateX(0px)' }, '50%': { transform: 'translateY(-10px) translateX(4px)' } },
        bubbleR:   { '0%,100%': { transform: 'translateY(0px) translateX(0px)' }, '50%': { transform: 'translateY(8px) translateX(-4px)'  } },
      },
      backgroundImage: {
        'violet-glow':   'radial-gradient(ellipse at 50% 60%, rgba(124,92,252,0.18) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #9B7EFF 0%, #C4B5FD 50%, #E879F9 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(155,126,255,0.08), rgba(232,121,249,0.04))',
      },
      boxShadow: {
        'violet':    '0 0 40px rgba(124,92,252,0.35)',
        'violet-lg': '0 0 80px rgba(124,92,252,0.25)',
        'card':      '0 2px 20px rgba(4,1,14,0.6)',
        'glow-sm':   '0 0 20px rgba(155,126,255,0.3)',
      },
    },
  },
  plugins: [],
}