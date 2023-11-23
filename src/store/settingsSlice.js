import { createSlice } from "@reduxjs/toolkit";

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
			state.temperatureUnit = state.temperatureUnit === "C" ? "F" : "C";
		},
		updatePreferences: (state, action) => {
			state.preferences = action.payload;
		},
	},
});

export const { toggleDarkMode, toggleTemperatureUnit, updatePreferences } = settingsSlice.actions;

export default settingsSlice.reducer;
