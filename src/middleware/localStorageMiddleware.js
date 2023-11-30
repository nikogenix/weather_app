import { resetPreferences, toggleDarkMode, toggleTemperatureUnit, updatePreferences } from "../store/settingsSlice";

const localStorageMiddleware = (store) => (next) => (action) => {
	if (
		action.type === updatePreferences.type ||
		action.type === resetPreferences.type ||
		action.type === toggleDarkMode.type ||
		action.type === toggleTemperatureUnit.type
	) {
		setTimeout(() => {
			const { settings } = store.getState();
			localStorage.setItem("nikogenix-weather-app-settings", JSON.stringify(settings));
		}, 0);
	}

	return next(action);
};

export default localStorageMiddleware;
