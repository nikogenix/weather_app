import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const AQI_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

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
	hourly: "temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,uv_index,is_day,winddirection_10m",
	daily: "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant",
	current_weather: "true",
	timezone: "auto",
};

const paramsForAqi = {
	hourly: "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,european_aqi",
	timezone: "auto",
};

// https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=10.5&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,cloudcover,visibility,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto&forecast_days=16

// https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,european_aqi&timezone=auto

const getWeather = async (date, location, temperatureUnit) => {
	if (date && location && temperatureUnit) {
		const { latitude, longitude } = location;
		const units = temperatureUnit === "C" ? paramsForC : paramsForF;
		console.log(date);
		const startDate = new Date(date);
		const endDate = new Date();
		endDate.setDate(endDate.getDate() + 16);
		const endDateAqi = new Date();
		endDateAqi.setDate(endDateAqi.getDate() + 5);

		const queryParams = new URLSearchParams({
			latitude,
			longitude,
			...paramsForWeather,
			...units,
			start_date: startDate.toISOString().split("T")[0], // YYYY-MM-DD
			end_date: endDate.toISOString().split("T")[0], // YYYY-MM-DD
		});

		const url = `${BASE_URL}?${queryParams.toString()}`;

		if (endDateAqi >= startDate) {
			const aqiQueryParams = new URLSearchParams({
				latitude,
				longitude,
				...paramsForAqi,
				start_date: startDate.toISOString().split("T")[0], // YYYY-MM-DD
				end_date: endDateAqi.toISOString().split("T")[0], // YYYY-MM-DD
			});

			const aqiUrl = `${AQI_URL}?${aqiQueryParams.toString()}`;

			const { data } = await axios.get(url);
			const { data: aqi } = await axios.get(aqiUrl);

			console.log(aqi);
			return { data, aqi };
		} else {
			const { data } = await axios.get(url);
			return { data, aqi: { hourly: { european_aqi: [] }, hourly_units: { european_aqi: [] } } };
		}
	}
};
export default getWeather;
