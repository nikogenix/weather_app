import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";

const rootReducer = combineReducers({
	settings: settingsReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
