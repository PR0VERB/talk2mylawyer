/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          500: '#0EA5E9',
          600: '#0284C7',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
        },
        red: {
          500: '#EF4444',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          400: '#9CA3AF',
          700: '#374151',
          900: '#111827'
        },
        indigo: {
          600: '#4F46E5',
          700: '#4338CA',
        },
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        xl: '0.75rem',
      },
      transitionDuration: {
        200: '200ms',
      },
    },
  },
  plugins: [],
};

