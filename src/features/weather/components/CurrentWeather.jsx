import { useSelector } from "react-redux";

import { Box, Card, CardContent, CardHeader, Icon, Typography } from "@mui/material";
import WeatherDetail from "./WeatherDetail";

import "../../../assets/css/weather-icons.min.css";
import "../../../assets/css/weather-icons-wind.min.css";

const WEATHER_CODES = {
	0: {
		description: "clear sky",
		dayIcon: "wi-day-sunny",
		nightIcon: "wi-night-clear",
	},
	1: {
		description: "mainly clear",
		dayIcon: "wi-day-sunny-overcast",
		nightIcon: "wi-night-alt-partly-cloudy",
	},
	2: {
		description: "partly cloudy",
		dayIcon: "wi-day-cloudy",
		nightIcon: "wi-night-alt-cloudy",
	},
	3: {
		description: "overcast",
		dayIcon: "wi-cloudy",
		nightIcon: "wi-cloudy",
	},
	45: {
		description: "fog",
		dayIcon: "wi-day-fog",
		nightIcon: "wi-night-fog",
	},
	48: {
		description: "depositing rime fog",
		dayIcon: "wi-day-fog",
		nightIcon: "wi-night-fog",
	},
	51: {
		description: "drizzle: light intensity",
		dayIcon: "wi-day-sprinkle",
		nightIcon: "wi-night-alt-sprinkle",
	},
	53: {
		description: "drizzle: moderate intensity",
		dayIcon: "wi-day-sprinkle",
		nightIcon: "wi-night-alt-sprinkle",
	},
	55: {
		description: "drizzle: dense intensity",
		dayIcon: "wi-day-sprinkle",
		nightIcon: "wi-night-alt-sprinkle",
	},
	56: {
		description: "freezing drizzle: light intensity",
		dayIcon: "wi-day-sprinkle",
		nightIcon: "wi-night-alt-sprinkle",
	},
	57: {
		description: "freezing drizzle: dense intensity",
		dayIcon: "wi-day-sprinkle",
		nightIcon: "wi-night-alt-sprinkle",
	},
	61: {
		description: "rain: slight intensity",
		dayIcon: "wi-day-rain-mix",
		nightIcon: "wi-night-alt-rain-mix",
	},
	63: {
		description: "rain: moderate intensity",
		dayIcon: "wi-day-rain",
		nightIcon: "wi-night-alt-rain",
	},
	65: {
		description: "rain: heavy intensity",
		dayIcon: "wi-day-rain-wind",
		nightIcon: "wi-night-alt-rain-wind",
	},
	66: {
		description: "freezing rain: light intensity",
		dayIcon: "wi-day-sleet",
		nightIcon: "wi-night-alt-sleet",
	},
	67: {
		description: "freezing rain: heavy intensity",
		dayIcon: "wi-day-sleet",
		nightIcon: "wi-night-alt-sleet",
	},
	71: {
		description: "snow fall: slight intensity",
		dayIcon: "wi-day-snow",
		nightIcon: "wi-night-snow",
	},
	73: {
		description: "snow fall: moderate intensity",
		dayIcon: "wi-day-snow",
		nightIcon: "wi-night-snow",
	},
	75: {
		description: "snow fall: heavy intensity",
		dayIcon: "wi-day-snow-wind",
		nightIcon: "wi-night-snow-wind",
	},
	77: {
		description: "snow grains",
		dayIcon: "wi-day-snow",
		nightIcon: "wi-night-snow",
	},
	80: {
		description: "rain showers: slight intensity",
		dayIcon: "wi-day-showers",
		nightIcon: "wi-night-alt-showers",
	},
	81: {
		description: "rain showers: moderate intensity",
		dayIcon: "wi-day-showers",
		nightIcon: "wi-night-alt-showers",
	},
	82: {
		description: "rain showers: violent intensity",
		dayIcon: "wi-day-showers",
		nightIcon: "wi-night-alt-showers",
	},
	85: {
		description: "snow showers: slight intensity",
		dayIcon: "wi-day-snow",
		nightIcon: "wi-night-alt-snow",
	},
	86: {
		description: "snow showers: heavy intensity",
		dayIcon: "wi-day-snow-wind",
		nightIcon: "wi-night-alt-snow-wind",
	},
	95: {
		description: "thunderstorm: slight or moderate",
		dayIcon: "wi-day-thunderstorm",
		nightIcon: "wi-night-alt-thunderstorm",
	},
	96: {
		description: "thunderstorm with slight hail",
		dayIcon: "wi-day-snow-thunderstorm",
		nightIcon: "wi-night-snow-thunderstorm",
	},
	99: {
		description: "thunderstorm with heavy hail",
		dayIcon: "wi-day-snow-thunderstorm",
		nightIcon: "wi-night-snow-thunderstorm",
	},
};

const CurrentWeather = () => {
	const { data } = useSelector((state) => state.weather);
	const weatherWarning = true;

	const currentWeatherTime = data.current_weather ? Number(data.current_weather.time.slice(11, 13)) : 0;

	if (Object.getOwnPropertyNames(data).length === 0) return <></>;

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
					title="current weather"
					subheader={
						/^[+-]\d+$/.test(data.timezone_abbreviation)
							? `${data.current_weather.time.slice(-5)} UTC${data.timezone_abbreviation}`
							: `${data.current_weather.time.slice(-5)} ${data.timezone_abbreviation}`
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
								data.current_weather.is_day
									? WEATHER_CODES[data.current_weather.weathercode].dayIcon
									: WEATHER_CODES[data.current_weather.weathercode].nightIcon
							}`}
						></Icon>
					</Box>
					<Box sx={{ m: 3 }}>
						<Typography fontSize={40}>
							{data.current_weather.temperature}
							{data.hourly_units.temperature_2m}
						</Typography>
						<Typography>{WEATHER_CODES[data.current_weather.weathercode].description}</Typography>
						<Typography>
							feels like {data.hourly.apparent_temperature[currentWeatherTime]}
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
							subheader={`${data.aqi.hourly.european_aqi[currentWeatherTime]} (${data.aqi.hourly_units.european_aqi})`}
						/>
						<WeatherDetail
							header="wind"
							subheader={`${data.current_weather.windspeed} ${data.daily_units.windspeed_10m_max}`}
						/>
						{/* WIP wind direction icon */}
						<WeatherDetail
							header="humidity"
							subheader={`${data.hourly.relativehumidity_2m[currentWeatherTime]}%`}
						/>
						<WeatherDetail
							header="visibility"
							subheader={`${data.hourly.visibility[currentWeatherTime].toFixed(0)} ${
								data.hourly_units.visibility
							}`}
						/>
					</Box>

					<Box sx={{ textAlign: "right", ml: 1, width: "40%" }}>
						<WeatherDetail header="UV index" subheader={data.hourly.uv_index[currentWeatherTime]} />
						<WeatherDetail
							header="surface pressure"
							subheader={`${data.hourly.surface_pressure[currentWeatherTime]} ${data.hourly_units.surface_pressure}`}
						/>
						<WeatherDetail
							header="dew point"
							subheader={`${data.hourly.dewpoint_2m[currentWeatherTime]}${data.hourly_units.dewpoint_2m}`}
						/>
						<WeatherDetail
							header="precipitation chance"
							subheader={`${data.hourly.precipitation_probability[currentWeatherTime]}%`}
						/>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default CurrentWeather;
