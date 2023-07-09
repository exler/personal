const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
				background: "#1a1a1a",
				primary: "#ed9d00",
				secondary: "#fece2f"
			},
			fontFamily: {
				sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
				stock: [defaultTheme.fontFamily.sans]
			},
			aspectRatio: {
				"4/3": "4 / 3",
				"3/2": "3 / 2",
				"2/3": "2 / 3",
				"9/16": "9 / 16"
			}
		}
	},
	plugins: [],
}
