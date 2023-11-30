import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import searchReducer from "../features/search/searchSlice";
import weatherReducer from "../features/weather/weatherSlice";
import localStorageMiddleware from "../middleware/localStorageMiddleware";

const rootReducer = combineReducers({
	settings: settingsReducer,
	search: searchReducer,
	weather: weatherReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), localStorageMiddleware],
});

export default store;
