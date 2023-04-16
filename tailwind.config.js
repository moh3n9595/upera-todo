/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/{pages,components,common,layouts}/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				orange: '#FF6633',
			},
		},
	},
	plugins: [],
};
