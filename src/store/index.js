import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import searchReducer from "../features/search/searchSlice";

const rootReducer = combineReducers({
	settings: settingsReducer,
	search: searchReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
