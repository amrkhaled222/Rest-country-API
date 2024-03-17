/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "selector",

	theme: {
		extend: {
			gridAutoColumns: {
				"2fr": "minmax(190px,264px )",
			},
			fontFamily: {
				display: ["Nunito Sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
