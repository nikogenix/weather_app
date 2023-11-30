import { useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./assets/css/weather-icons.min.css";
import "./assets/css/weather-icons-wind.min.css";

import { useDispatch, useSelector } from "react-redux";
import { updateAllSettings, toggleDarkMode } from "./store/settingsSlice";
import { getDesignTokens } from "./data/theme";

import { Container, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./layouts/ResponsiveAppBar";

import Home from "./pages/Home";
import Trip from "./pages/Trip";
import SlidingFooter from "./layouts/SlidingFooter";

function App() {
	const dispatch = useDispatch();

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const darkMode = useSelector((state) => state.settings.darkMode);
	!prefersDarkMode && darkMode && dispatch(toggleDarkMode());

	const theme = useMemo(() => createTheme(getDesignTokens(darkMode ? "dark" : "light")), [darkMode]);

	useEffect(() => {
		const localSettings = localStorage.getItem("nikogenix-weather-app-settings");
		if (localSettings) {
			const parsedSettings = JSON.parse(localSettings);
			dispatch(updateAllSettings(parsedSettings));
		}
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<ResponsiveAppBar></ResponsiveAppBar>
			<Container sx={{ maxWidth: 900, marginTop: 5 }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/trip" element={<Trip />} />
				</Routes>
			</Container>
			<SlidingFooter></SlidingFooter>
		</ThemeProvider>
	);
}

export default App;
