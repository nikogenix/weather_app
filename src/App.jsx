import { useMemo, useState } from "react";
import "./App.css";
import { Button, Box, Container, Typography, Link, SvgIcon, CardHeader, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [user, setUser] = useState("");

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Box>
					<Typography variant="h1">Weather App</Typography>
					{!user && (
						<Button variant="contained" color="primary">
							Login
						</Button>
					)}
					{user && (
						<>
							<Button variant="contained" color="primary">
								Settings
							</Button>
							<Button variant="contained" color="primary">
								Logout
							</Button>
						</>
					)}
				</Box>
				<Box>
					<TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
					<TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
				</Box>
				<Box>
					<Typography variant="p">Weather Info</Typography>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
