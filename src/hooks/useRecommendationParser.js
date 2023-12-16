import { useSelector } from "react-redux";
import getWeatherIconSet from "../utils/getWeatherIconSet";

export default function useRecommendationParser(
	data,
	startDate = "2023-12-20T00:00",
	endDate = "2023-12-20T23:00",
	iconSize = 45
) {
	const preferences = useSelector((state) => state.settings.preferences);

	if (!data.hourly) return null;

	const upperClothingIcons = getWeatherIconSet("upperClothing", iconSize);
	const upperClothingLayerIcons = getWeatherIconSet("upperClothingLayer", iconSize);
	const lowerClothingIcons = getWeatherIconSet("lowerClothing", iconSize);
	const bootsIcons = getWeatherIconSet("boots", iconSize);
	const accessoriesIcons = getWeatherIconSet("accessories", iconSize);
	const miscellaneousIcons = getWeatherIconSet("miscellaneous", iconSize);
	const unknownIcon = null;

	const start = data.hourly.time.findIndex((c) => c === startDate);
	const end = data.hourly.time.findLastIndex((c) => c === endDate);

	const temperature = findMinMaxAvg(data.hourly.apparent_temperature.slice(start, end + 1));
	const precipitation = findMinMaxAvg(data.hourly.precipitation_probability.slice(start, end + 1));
	const uv = findMinMaxAvg(data.hourly.uv_index.slice(start, end + 1));
	const aqi = findMinMaxAvg(data.aqi.hourly.european_aqi.slice(start, end + 1));
	const snowfall = findMinMaxAvg(data.hourly.snowfall.slice(start, end + 1));
	const snowDepth = findMinMaxAvg(data.hourly.snow_depth.slice(start, end + 1));

	const upperClothing = parseUpperClothing(preferences.upperClothing, temperature, upperClothingIcons, unknownIcon);
	const upperClothingLayer = parseUpperClothingLayer(
		preferences.upperClothingLayer,
		temperature,
		uv,
		snowfall,
		snowDepth,
		upperClothingLayerIcons,
		unknownIcon
	);
	const lowerClothing = parseLowerClothing(
		preferences.lowerClothing,
		temperature,
		precipitation,
		snowfall,
		snowDepth,
		lowerClothingIcons,
		unknownIcon
	);
	const boots = parseBoots(
		preferences.boots,
		temperature,
		precipitation,
		snowfall,
		snowDepth,
		bootsIcons,
		unknownIcon
	);
	const { accessories, miscellaneous } = {
		...parseAccessoriesAndMisc(
			preferences,
			precipitation,
			uv,
			temperature,
			snowfall,
			snowDepth,
			aqi,
			miscellaneousIcons,
			accessoriesIcons
		),
	};

	return { clothing: { upperClothing, upperClothingLayer, lowerClothing, boots }, accessories, miscellaneous };
}

const parseAccessoriesAndMisc = (
	settings,
	precipitation,
	uv,
	temperature,
	snowfall,
	snowDepth,
	aqi,
	miscellaneousIcons,
	accessoriesIcons
) => {
	const determineWindowsResults = () => {
		const winSettings = settings.miscellaneous.windows;

		const disabled =
			winSettings.openIfTempThreshold.enabled === false &&
			winSettings.openIfAqiThreshold.enabled === false &&
			winSettings.closeIfRainOrSnow === false;

		if (disabled) return { disabled, incompleteData: null, icon: null };

		const incompleteData =
			temperature === null ||
			temperature.incompleteData ||
			aqi === null ||
			aqi.incompleteData ||
			precipitation === null ||
			precipitation.incompleteData ||
			snowDepth === null ||
			snowDepth.incompleteData ||
			snowfall === null ||
			snowfall.incompleteData;

		const tempThreshold = winSettings.openIfTempThreshold.enabled
			? temperature.avg >= winSettings.openIfTempThreshold.minValue &&
			  temperature.avg <= winSettings.openIfTempThreshold.maxValue
			: null;
		const aqiThreshold = winSettings.openIfAqiThreshold.enabled
			? aqi.max <= winSettings.openIfAqiThreshold.value
			: null;
		const rainOrSnow = winSettings.closeIfRainOrSnow ? precipitation.min > 0 || snowfall > 0 : null;

		const icon = rainOrSnow
			? miscellaneousIcons.windows.closed
			: tempThreshold === null && aqiThreshold === null
			? miscellaneousIcons.windows.open
			: tempThreshold === null && aqiThreshold
			? miscellaneousIcons.windows.open
			: aqiThreshold === null && tempThreshold
			? miscellaneousIcons.windows.open
			: tempThreshold === false || aqiThreshold === false
			? miscellaneousIcons.windows.closed
			: miscellaneousIcons.windows.open;

		return { icon, disabled, incompleteData };
	};

	const result = {
		accessories: {
			umbrellaRainCoat: {
				icon:
					precipitation === null
						? null
						: precipitation.max > 0 && settings.accessories.umbrella.rain
						? accessoriesIcons.umbrellaRainCoat
						: null,
				incompleteData: precipitation === null || precipitation.incompleteData,
				disabled: settings.accessories.umbrella.rain === false,
			},
			sunglasses: {
				icon:
					uv === null
						? null
						: uv.max >= settings.accessories.sunglasses.ifUvThreshold.value &&
						  settings.accessories.sunglasses.ifUvThreshold.enabled
						? accessoriesIcons.sunglasses
						: null,
				incompleteData: uv === null || uv.incompleteData,
				disabled: settings.accessories.sunglasses.ifUvThreshold.enabled === false,
			},
			sunHatUmbrella: {
				icon:
					uv === null
						? null
						: uv.max >= settings.accessories.sunHat.ifUvThreshold.value &&
						  settings.accessories.sunHat.ifUvThreshold.enabled
						? accessoriesIcons.sunHatUmbrella
						: null,
				incompleteData: uv === null || uv.incompleteData,
				disabled: settings.accessories.sunHat.ifUvThreshold.enabled === false,
			},
			glovesCapComforter: {
				icon:
					temperature === null && snowfall === null && snowDepth === null
						? null
						: (snowDepth.max || snowfall.max) && settings.accessories.gloves.ifSnow
						? accessoriesIcons.glovesCapComforter
						: temperature.min <= settings.accessories.gloves.ifTempThreshold.value &&
						  settings.accessories.gloves.ifTempThreshold.enabled
						? accessoriesIcons.glovesCapComforter
						: null,
				incompleteData:
					temperature === null ||
					temperature.incompleteData ||
					snowfall === null ||
					snowfall.incompleteData ||
					snowDepth === null ||
					snowDepth.incompleteData,
				disabled:
					settings.accessories.gloves.ifSnow === false &&
					settings.accessories.gloves.ifTempThreshold.enabled === false,
			},
		},
		miscellaneous: {
			sunscreen: {
				icon:
					uv === null
						? null
						: uv.max >= settings.miscellaneous.spf.ifUvThreshold.value &&
						  settings.miscellaneous.spf.ifUvThreshold.enabled
						? miscellaneousIcons.sunscreen
						: null,
				incompleteData: uv === null || uv.incompleteData,
				disabled: settings.miscellaneous.spf.ifUvThreshold.enabled === false,
			},
			mask: {
				icon:
					aqi === null
						? null
						: aqi.max >= settings.miscellaneous.mask.ifAqiThreshold.value &&
						  settings.miscellaneous.mask.ifAqiThreshold.enabled
						? miscellaneousIcons.mask
						: null,
				incompleteData: aqi === null || aqi.incompleteData,
				disabled: settings.miscellaneous.mask.ifAqiThreshold.enabled === false,
			},
			water: {
				icon: settings.miscellaneous.water.always
					? miscellaneousIcons.water
					: temperature === null
					? null
					: temperature.max >= settings.miscellaneous.water.ifTempThreshold.value &&
					  settings.miscellaneous.water.ifTempThreshold.enabled
					? miscellaneousIcons.water
					: null,
				incompleteData: settings.miscellaneous.water.always
					? false
					: temperature === null || temperature.incompleteData,
				disabled:
					settings.miscellaneous.water.ifTempThreshold.enabled === false &&
					settings.miscellaneous.water.always === false,
			},
			noElectronics: {
				icon:
					temperature === null
						? null
						: temperature.max >= settings.miscellaneous.electronicsOverheat.ifTempThreshold.value &&
						  settings.miscellaneous.electronicsOverheat.ifTempThreshold.enabled
						? miscellaneousIcons.noElectronics
						: null,
				incompleteData: temperature === null || temperature.incompleteData,
				disabled: settings.miscellaneous.electronicsOverheat.ifTempThreshold.enabled === false,
			},
			windows: determineWindowsResults(),
		},
	};

	return result;
};

const parseBoots = (settings, temperature, precipitation, snowfall, snowDepth, bootsIcons, unknownIcon) => {
	const result = {
		incompleteData: false,
	};

	for (let stat of ["min", "max", "avg"]) {
		result.incompleteData =
			result.incompleteData ||
			temperature?.incompleteData ||
			precipitation?.incompleteData ||
			snowfall?.incompleteData ||
			snowDepth?.incompleteData ||
			[temperature, precipitation, snowfall, snowDepth].includes(null);

		if ((snowfall || snowDepth) && settings.bootsIfSnow && (snowfall[stat] || snowDepth[stat])) {
			result[stat] = bootsIcons[0]; // winter boots
			continue;
		}
		if (temperature) {
			result[stat] = bootsIcons[parseTempRanges(settings.values, temperature[stat])];
		}
		if (precipitation && settings.rainNoSandals && precipitation[stat]) {
			if (result[stat] === bootsIcons[3]) {
				result[stat] = bootsIcons[2];
			}
		}
	}

	if (temperature === null) return unknownIcon;
	return result;
};

const parseLowerClothing = (
	settings,
	temperature,
	precipitation,
	snowfall,
	snowDepth,
	lowerClothingIcons,
	unknownIcon
) => {
	const result = {
		incompleteData: false,
	};

	for (let stat of ["min", "max", "avg"]) {
		result.incompleteData =
			result.incompleteData ||
			temperature?.incompleteData ||
			precipitation?.incompleteData ||
			snowfall?.incompleteData ||
			snowDepth?.incompleteData ||
			[temperature, precipitation, snowfall, snowDepth].includes(null);

		if ((snowfall || snowDepth) && settings.trousersIfSnow && (snowfall[stat] || snowDepth[stat])) {
			result[stat] = lowerClothingIcons[0]; // winter trousers
			continue;
		}
		if (temperature) {
			result[stat] = lowerClothingIcons[parseTempRanges(settings.values, temperature[stat])];
		}
		if (precipitation && settings.rainNoShorts && precipitation[stat]) {
			if (result[stat] === lowerClothingIcons[4]) {
				result[stat] = lowerClothingIcons[3];
			}
		}
	}

	if (temperature === null) return unknownIcon;
	return result;
};

const parseUpperClothingLayer = (
	settings,
	temperature,
	uv,
	snowfall,
	snowDepth,
	upperClothingLayerIcons,
	unknownIcon
) => {
	const result = {
		incompleteData: false,
	};

	for (let stat of ["min", "max", "avg"]) {
		result.incompleteData =
			result.incompleteData ||
			temperature?.incompleteData ||
			uv?.incompleteData ||
			snowfall?.incompleteData ||
			snowDepth?.incompleteData ||
			[temperature, uv, snowfall, snowDepth].includes(null);

		if ((snowfall || snowDepth) && settings.jacketIfSnow && (snowfall[stat] || snowDepth[stat])) {
			result[stat] = upperClothingLayerIcons[0]; // winter jacket
			continue;
		}
		if (temperature) {
			result[stat] = upperClothingLayerIcons[parseTempRanges(settings.values, temperature[stat])];
		}
		if (uv && settings.coverIfSunAndUvThreshold.enabled && uv[stat]) {
			if (uv[stat] < settings.coverIfSunAndUvThreshold.value && result[stat] === upperClothingLayerIcons[4]) {
				result[stat] = unknownIcon;
			}
		}
	}

	if (temperature === null) return unknownIcon;
	return result;
};

const parseUpperClothing = (settings, temperature, upperClothingIcons, unknownIcon) => {
	if (temperature === null) return unknownIcon;
	const preferredTempRanges = settings.values;
	return {
		min: upperClothingIcons[parseTempRanges(preferredTempRanges, temperature.min)],
		max: upperClothingIcons[parseTempRanges(preferredTempRanges, temperature.max)],
		avg: upperClothingIcons[parseTempRanges(preferredTempRanges, temperature.avg)],
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
