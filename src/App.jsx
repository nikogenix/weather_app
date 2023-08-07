import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./store/settingsSlice";
import { getDesignTokens } from "./data/theme";

import { Container, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./layouts/ResponsiveAppBar";

import Home from "./pages/Home";
import Trip from "./pages/Trip";

function App() {
	const dispatch = useDispatch();

	// const [user, setUser] = useState("");

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const darkMode = useSelector((state) => state.settings.darkMode);
	!prefersDarkMode && darkMode && dispatch(toggleDarkMode());

	const theme = useMemo(() => createTheme(getDesignTokens(darkMode ? "dark" : "light")), [darkMode]);

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
		</ThemeProvider>
	);
}

export default App;
