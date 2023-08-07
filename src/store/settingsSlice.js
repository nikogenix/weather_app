import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		darkMode: true,
		temperatureUnit: "C",
	},
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		toggleTemperatureUnit: (state) => {
			state.temperatureUnit = state.temperatureUnit === "C" ? "F" : "C";
		},
	},
});

export const { toggleDarkMode, toggleTemperatureUnit } = settingsSlice.actions;

export default settingsSlice.reducer;
