import { createSlice } from "@reduxjs/toolkit";

import { convertBetweenCandF } from "../utils/formatWeatherData";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		darkMode: true,
		temperatureUnit: "C",
		preferences: {
			upperClothing: {
				values: [-10, 0, 10, 20],
			},
			upperClothingLayer: {
				values: [-10, 0, 10, 20],
				jacketIfSnow: true,
				coverIfSunAndUvThreshold: { enabled: true, value: 3 },
			},
			lowerClothing: {
				values: [-10, 0, 10, 20],
				rainNoShorts: true,
				trousersIfSnow: true,
			},
			boots: {
				values: [0, 10, 20],
				rainNoSandals: true,
				bootsIfSnow: true,
			},
			accessories: {
				umbrella: {
					rain: true,
				},
				sunglasses: {
					ifUvThreshold: { enabled: true, value: 3 },
				},
				sunHat: {
					ifUvThreshold: { enabled: true, value: 3 },
				},
				gloves: {
					ifTempThreshold: { enabled: true, value: 0 },
					ifSnow: true,
				},
			},
			miscellaneous: {
				spf: {
					ifUvThreshold: { enabled: true, value: 3 },
				},
				mask: {
					ifAqiThreshold: { enabled: true, value: 20 },
				},
				water: {
					ifTempThreshold: { enabled: true, value: 20 },
					always: true,
				},
				electronicsOverheat: {
					ifTempThreshold: { enabled: true, value: 30 },
				},
				windows: {
					openIfTempThreshold: { enabled: true, minValue: 15, maxValue: 25 },
					openIfAqiThreshold: { enabled: true, value: 20 },
					closeIfRainOrSnow: true,
				},
			},
		},
	},
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		toggleTemperatureUnit: (state) => {
			const currentUnit = state.temperatureUnit;

			state.temperatureUnit = state.temperatureUnit === "C" ? "F" : "C";

			state.preferences.upperClothing.values = state.preferences.upperClothing.values.map((temp) =>
				convertBetweenCandF(temp, currentUnit)
			);
			state.preferences.upperClothingLayer.values = state.preferences.upperClothingLayer.values.map((temp) =>
				convertBetweenCandF(temp, currentUnit)
			);
			state.preferences.lowerClothing.values = state.preferences.lowerClothing.values.map((temp) =>
				convertBetweenCandF(temp, currentUnit)
			);
			state.preferences.boots.values = state.preferences.boots.values.map((temp) =>
				convertBetweenCandF(temp, currentUnit)
			);
			state.preferences.accessories.gloves.ifTempThreshold.value = convertBetweenCandF(
				state.preferences.miscellaneous.water.ifTempThreshold.value,
				currentUnit
			);
			state.preferences.miscellaneous.water.ifTempThreshold.value = convertBetweenCandF(
				state.preferences.miscellaneous.water.ifTempThreshold.value,
				currentUnit
			);
			state.preferences.miscellaneous.electronicsOverheat.ifTempThreshold.value = convertBetweenCandF(
				state.preferences.miscellaneous.electronicsOverheat.ifTempThreshold.value,
				currentUnit
			);
			state.preferences.miscellaneous.windows.openIfTempThreshold.minValue = convertBetweenCandF(
				state.preferences.miscellaneous.windows.openIfTempThreshold.minValue,
				currentUnit
			);
			state.preferences.miscellaneous.windows.openIfTempThreshold.maxValue = convertBetweenCandF(
				state.preferences.miscellaneous.windows.openIfTempThreshold.maxValue,
				currentUnit
			);
		},
		updatePreferences: (state, action) => {
			state.preferences = action.payload;
		},
	},
});

export const { toggleDarkMode, toggleTemperatureUnit, updatePreferences } = settingsSlice.actions;

export default settingsSlice.reducer;
