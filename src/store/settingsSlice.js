import { createSlice } from "@reduxjs/toolkit";

import { convertBetweenCandF } from "../utils/formatWeatherData";

import { defaultPreferencesC, defaultPreferencesF } from "../data/settings";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		darkMode: true,
		temperatureUnit: "C",
		preferences: { ...defaultPreferencesC },
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
				state.preferences.accessories.gloves.ifTempThreshold.value,
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
		resetPreferences: (state) => {
			state.preferences = state.temperatureUnit === "C" ? { ...defaultPreferencesC } : { ...defaultPreferencesF };
		},
		updateAllSettings: (state, action) => {
			state.preferences = action.payload.preferences;
			state.darkMode = action.payload.darkMode;
			state.temperatureUnit = action.payload.temperatureUnit;
		},
	},
});

export const { toggleDarkMode, toggleTemperatureUnit, updatePreferences, resetPreferences, updateAllSettings } =
	settingsSlice.actions;

export default settingsSlice.reducer;
