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
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				scrollbarColor: mode === "light" ? "#6b6b6b #f0f0f0" : "#6b6b6b #2b2b2b",
				"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
					backgroundColor: mode === "light" ? "#39214c" : "#2b2b2b",
					width: "12px",
					height: "12px",
					margin: 20,
				},
				"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
					borderRadius: 8,
					backgroundColor: "#959595",
					minHeight: 24,
					border: mode === "light" ? "3px solid #39214c" : "3px solid #2b2b2b",
				},
				"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
					backgroundColor: "#c1c1c1",
				},
				"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
					backgroundColor: "#c1c1c1",
				},
				"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
					backgroundColor: "#c1c1c1",
				},
				"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
					backgroundColor: mode === "light" ? "#39214c" : "#2b2b2b",
				},
			},
		},
	},
});
