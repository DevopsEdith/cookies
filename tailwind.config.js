// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#4da6ff',
            DEFAULT: '#0080ff',
            dark: '#0066cc',
          },
          secondary: {
            light: '#f8f9fa',
            DEFAULT: '#e9ecef',
            dark: '#dee2e6',
          },
          success: '#28a745',
          danger: '#dc3545',
          warning: '#ffc107',
          info: '#17a2b8',
        },
      },
    },
    plugins: [],
  }