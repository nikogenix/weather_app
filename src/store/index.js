import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import searchReducer from "../features/search/searchSlice";
import weatherReducer from "../features/weather/weatherSlice";

const rootReducer = combineReducers({
	settings: settingsReducer,
	search: searchReducer,
	weather: weatherReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
