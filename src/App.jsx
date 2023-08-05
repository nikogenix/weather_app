import { useMemo, useState } from "react";

import "./App.css";

import { Button, Box, Container, Typography, TextField } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

import { ColorModeContext } from "./context/ThemeContext";

function App() {
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [user, setUser] = useState("");

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
					<Box>
						<TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
						<TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
					</Box>
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
