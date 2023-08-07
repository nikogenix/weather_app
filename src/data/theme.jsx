export const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: {
						main: "#39214c",
						dark: "#482e5e",
					},
					secondary: {
						main: "#e2bd59",
					},
					error: {
						main: "#d32f2f",
					},
					background: {
						paper: "#f7f3e8",
						default: "#ede6f3",
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: "#a970dc",
					},
					secondary: {
						main: "#c5a140",
					},
			  }),
	},
});
