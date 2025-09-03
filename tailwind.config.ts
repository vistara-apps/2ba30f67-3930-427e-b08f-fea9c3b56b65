import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(230, 15%, 12%)',
        accent: 'hsl(200, 70%, 55%)',
        primary: 'hsl(20, 90%, 50%)',
        surface: 'hsl(230, 15%, 18%)',
        textPrimary: 'hsl(0, 0%, 95%)',
        textSecondary: 'hsl(0, 0%, 75%)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        modal: '0 10px 40px hsla(0, 0%, 0%, 0.2)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
};

export default config;
