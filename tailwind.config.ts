import { Config } from 'tailwindcss';

export default <Config>{
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: { min: '1025px' },
      desktop: { min: '1200px' },
    },
  },
};
