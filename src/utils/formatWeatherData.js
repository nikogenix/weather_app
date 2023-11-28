import { WEATHER_CODES } from "../data/weather";

export function formatWeatherData(value, unit, type) {
	const nullExceptions = ["weather icon"];

	if ((value === null || value === undefined) && !nullExceptions.includes(type)) return "N/A";
	if (type === "temperature") return `${value}${unit}`;
	if (type === "apparent temperature") return `feels like ${value}${unit}`;
	if (type === "degree") return `${value}°`;
	if (type === "aqi") return `${value} (${unit})`;
	if (type === "percentage") return `${value}%`;
	if (type === "misc integer") return `${value.toFixed(0)} ${unit}`;
	if (type === "misc") return `${value} ${unit}`;
	if (type === "unitless") return `${value}`;
	if (type === "weather description") return WEATHER_CODES[value].description;
	if (type === "weather icon") {
		if (value === null) return `wi-na`;
		else return unit ? WEATHER_CODES[value].dayIcon : WEATHER_CODES[value].nightIcon;
	}
}

export const convertBetweenCandF = (value, currentUnit) => {
	if (currentUnit === "F") return ((value - 32) * 5) / 9;
	else if (currentUnit === "C") return (value * 9) / 5 + 32;
};
