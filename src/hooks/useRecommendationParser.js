import { useSelector } from "react-redux";
import getWeatherIconSet from "../utils/getWeatherIconSet";

const recommendations = {
	clothing: {
		min: { upperClothing: null, upperClothingLayer: null, lowerClothing: null, boots: null },
		max: { upperClothing: null, upperClothingLayer: null, lowerClothing: null, boots: null },
		avg: { upperClothing: null, upperClothingLayer: null, lowerClothing: null, boots: null },
	},
	accessories: { umbrellaRainCoat: null, sunglasses: null, sunHatUmbrella: null, glovesCapComforter: null },
	miscellaneous: { sunscreen: null, mask: null, water: null, noElectronics: null, windows: null },
};

let iconSize = 45;
const upperClothingIcons = getWeatherIconSet("upperClothing", iconSize);
const upperClothingLayerIcons = getWeatherIconSet("upperClothingLayer", iconSize);
const lowerClothingIcons = getWeatherIconSet("lowerClothing", iconSize);
const bootsIcons = getWeatherIconSet("boots", iconSize);

export default function useRecommendationParser(data, startDate = "2023-12-21T00:00", endDate = "2023-12-25T23:00") {
	const preferences = useSelector((state) => state.settings.preferences);

	if (!data.hourly) return null;

	const start = data.hourly.time.findIndex((c) => c === startDate);
	const end = data.hourly.time.findLastIndex((c) => c === endDate);

	const temperature = findMinMaxAvg(data.hourly.apparent_temperature.slice(start, end + 1));
	const precipitation = findMinMaxAvg(data.hourly.precipitation_probability.slice(start, end + 1));
	const uv = findMinMaxAvg(data.hourly.uv_index.slice(start, end + 1));
	const aqi = findMinMaxAvg(data.aqi.hourly.european_aqi.slice(start, end + 1));
	const snowfall = findMinMaxAvg(data.hourly.snowfall.slice(start, end + 1));

	console.log(preferences);

	const upperClothing = parseUpperClothing(preferences.upperClothing.values, temperature);

	return { clothing: { upperClothing } };
}

const parseUpperClothing = (ranges, temperature) => {
	if (temperature === null) return "no data";
	return {
		min: upperClothingIcons[parseTempRanges(ranges, temperature.min)],
		max: upperClothingIcons[parseTempRanges(ranges, temperature.max)],
		avg: upperClothingIcons[parseTempRanges(ranges, temperature.avg)],
		incompleteData: temperature.incompleteData,
	};
};

const parseTempRanges = (ranges, temp) => {
	for (let i = 0; i < ranges.length; i++) {
		if (temp < ranges[i]) return i;
	}
	return ranges.length;
};

const findMinMaxAvg = (arr) => {
	let incompleteData = false;
	let noData = true;
	const result = arr.reduce(
		(acc, c) => {
			if (typeof c !== "number") {
				incompleteData = true;
				return acc;
			}
			noData = false;
			acc.min = c < acc.min ? c : acc.min;
			acc.max = c > acc.max ? c : acc.max;
			acc.sum += c;
			return acc;
		},
		{ min: Infinity, max: -Infinity, sum: 0 }
	);

	if (noData) return null;
	return { min: result.min, max: result.max, avg: result.sum / arr.length, incompleteData };
};
