/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				nunito: ['Nunito', 'sans-serif'],
			},
			colors: {
				primary: '#0077B6',
				secondary: '#454545',
				mainBgColor: '#f5f4f2',
			},
		},
	},
	plugins: [],
};
