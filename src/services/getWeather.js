import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const paramsForC = {
	temperature_unit: "celsius",
	windspeed_unit: "kmh",
	precipitation_unit: "mm",
};
const paramsForF = {
	temperature_unit: "fahrenheit",
	windspeed_unit: "mph",
	precipitation_unit: "inch",
};

const paramsForWeather = {
	hourly: "temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m,uv_index,is_day",
	daily: "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant",
	current_weather: "true",
	timezone: "auto",
	forecast_days: "16",
};
// https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=10.5&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto&forecast_days=16

const getWeather = async (date, location, temperatureUnit) => {
	if (date && location && temperatureUnit) {
		const { latitude, longitude } = location;
		const units = temperatureUnit === "C" ? paramsForC : paramsForF;

		const queryParams = new URLSearchParams({
			latitude,
			longitude,
			...paramsForWeather,
			...units,
		});

		const url = `${BASE_URL}?${queryParams.toString()}`;

		const { data } = await axios.get(url);
		//TODO get air quality https://open-meteo.com/en/docs/air-quality-api

		return data;
	}
};

export default getWeather;
