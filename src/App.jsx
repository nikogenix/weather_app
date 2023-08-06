import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { Container } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./layouts/ResponsiveAppBar";

import { ColorModeContext } from "./context/ThemeContext";
import Home from "./pages/Home";
import Trip from "./pages/Trip";

function App() {
	// const [user, setUser] = useState("");

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<ResponsiveAppBar></ResponsiveAppBar>
				<Container sx={{ width: 900, marginTop: 5 }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/trip" element={<Trip />} />
					</Routes>
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
