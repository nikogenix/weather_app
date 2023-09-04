import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { Box, Card, CardContent, CardHeader, Icon, Typography } from "@mui/material";
import WeatherDetail from "./WeatherDetail";

import "../../../assets/css/weather-icons.min.css";
import "../../../assets/css/weather-icons-wind.min.css";

import { WEATHER_CODES } from "../../../data/weather";

const CurrentWeather = () => {
	const { data } = useSelector((state) => state.weather);
	const { date, dateChange } = useSelector((state) => state.search);
	const weatherWarning = false;

	if (Object.getOwnPropertyNames(data).length === 0) return <></>;

	const selectedTime = dateChange
		? `${new Date(date).getHours().toString().padStart(2, "0")}:00`
		: data.current_weather.time.slice(11, 16);
	const forecastStartIndex = Number(selectedTime.slice(0, 2));

	return (
		<Card sx={{ display: "flex", flexDirection: "column" }}>
			{/* headers */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<CardHeader
					title={`${data.location.name}${data.location.admin1 ? `, ${data.location.admin1}` : ""}${
						data.location.country ? `, ${data.location.country}` : ""
					}`}
					subheader={
						/^[+-]\d+$/.test(data.timezone_abbreviation)
							? `${dayjs(data.hourly.time[forecastStartIndex]).format("MMMM D,")} ${selectedTime} UTC${
									data.timezone_abbreviation
							  }`
							: `${dayjs(data.hourly.time[forecastStartIndex]).format("MMMM D,")} ${selectedTime} ${
									data.timezone_abbreviation
							  }`
					}
					titleTypographyProps={{ fontSize: 20 }}
					subheaderTypographyProps={{ fontSize: 15 }}
					sx={{ width: "50%", pt: 3, pl: 3 }}
				/>
				{weatherWarning && (
					<CardHeader
						title="warning"
						subheader="WIP"
						titleTypographyProps={{ fontSize: 20, textAlign: "right" }}
						subheaderTypographyProps={{ fontSize: 15, textAlign: "right" }}
						sx={{ width: "50%", pt: 3, pr: 3 }}
					/>
				)}
			</Box>

			{/* weather */}
			<CardContent
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					flexDirection: "column",
					width: "100%",
					maxWidth: 400,
					alignSelf: "left",
				}}
			>
				{/* icon and temperature */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyItems: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyItems: "center",
							flexFlow: "column",
							alignItems: "center",
						}}
					>
						<Icon
							component="i"
							sx={{ fontSize: 80, overflow: "visible", width: "min-content" }}
							baseClassName={`wi ${
								data.hourly.is_day[forecastStartIndex]
									? WEATHER_CODES[Number(data.hourly.weathercode[forecastStartIndex])].dayIcon
									: WEATHER_CODES[Number(data.hourly.weathercode[forecastStartIndex])].nightIcon
							}`}
							aria-hidden={false}
							aria-label={`weather icon: ${
								WEATHER_CODES[Number(data.hourly.weathercode[forecastStartIndex])].description
							}`}
							role="img"
						></Icon>
					</Box>
					<Box sx={{ m: 3 }}>
						<Typography fontSize={40}>
							{data.hourly.temperature_2m[forecastStartIndex]}
							{data.hourly_units.temperature_2m}
						</Typography>
						<Typography>
							{WEATHER_CODES[data.hourly.weathercode[forecastStartIndex]].description}
						</Typography>
						<Typography>
							feels like {data.hourly.apparent_temperature[forecastStartIndex]}
							{data.hourly_units.temperature_2m}
						</Typography>
					</Box>
				</Box>

				{/* weather details */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: { xs: "100%", sm: "100%" },
						mt: { xs: 3, sm: 0 },
					}}
				>
					<Box sx={{ mr: 1, width: "40%" }}>
						<WeatherDetail
							header="air quality"
							subheader={
								data.aqi.hourly.european_aqi[forecastStartIndex]
									? `${data.aqi.hourly.european_aqi[forecastStartIndex]} (${data.aqi.hourly_units.european_aqi})`
									: "no data"
							}
						/>
						<WeatherDetail
							header="wind"
							subheader={`${data.hourly.windspeed_10m[forecastStartIndex]} ${data.daily_units.windspeed_10m_max}`}
						/>
						{/* WIP wind direction icon */}
						<WeatherDetail
							header="humidity"
							subheader={`${data.hourly.relativehumidity_2m[forecastStartIndex]}%`}
						/>
						<WeatherDetail
							header="visibility"
							subheader={`${data.hourly.visibility[forecastStartIndex].toFixed(0)} ${
								data.hourly_units.visibility
							}`}
						/>
					</Box>

					<Box sx={{ textAlign: "right", ml: 1, width: "40%" }}>
						<WeatherDetail header="UV index" subheader={data.hourly.uv_index[forecastStartIndex]} />
						<WeatherDetail
							header="surface pressure"
							subheader={`${data.hourly.surface_pressure[forecastStartIndex]} ${data.hourly_units.surface_pressure}`}
						/>
						<WeatherDetail
							header="dew point"
							subheader={`${data.hourly.dewpoint_2m[forecastStartIndex]}${data.hourly_units.dewpoint_2m}`}
						/>
						<WeatherDetail
							header="precipitation chance"
							subheader={
								data.hourly.precipitation_probability[forecastStartIndex] !== null
									? `${data.hourly.precipitation_probability[forecastStartIndex]}%`
									: "no data"
							}
						/>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default CurrentWeather;
