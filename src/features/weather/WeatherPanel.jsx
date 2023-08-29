import { useSelector } from "react-redux";

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import WeatherDetail from "./components/WeatherDetail";

const WeatherPanel = () => {
	const { data } = useSelector((state) => state.weather);
	const weatherWarning = true;

	const header = "Temperature";
	const subheader = "25°C";

	return (
		<Card>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<CardHeader title="current weather" subheader="13:57" />
				{weatherWarning && <CardHeader title="warning" subheader="heavy rain" />}
			</Box>

			<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
				<Box sx={{ display: "flex" }}>
					<Box>
						<CloudIcon sx={{ fontSize: 80, ml: 5, mr: 5 }}></CloudIcon>
						<Typography>mostly cloudy</Typography>
					</Box>
					<Box>
						<Typography fontSize={50}>23°C</Typography>
						<Typography>feels like 23°C</Typography>
					</Box>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "space-around" }}>
					<Box sx={{ mr: 10 }}>
						<WeatherDetail header="air quality" subheader="67" />
						<WeatherDetail header="wind" subheader="1 km/h" />
						<WeatherDetail header="humidity" subheader="54%" />
						<WeatherDetail header="visibility" subheader="10 km" />
					</Box>
					<Box>
						<WeatherDetail header="UV index" subheader="0" />
						<WeatherDetail header="pressure" subheader="1008 mb" />
						<WeatherDetail header="dew point" subheader="12°" />
						<WeatherDetail header="precipitation chance" subheader="0%" />
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default WeatherPanel;
