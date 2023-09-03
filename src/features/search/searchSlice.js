import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		location: "",
		date: "",
		dateChange: false,
	},
	reducers: {
		setLocation: (state, action) => {
			state.location = action.payload;
		},
		setDate: (state, action) => {
			state.date = action.payload;
		},
		setDateChange: (state, action) => {
			state.dateChange = action.payload;
		},
	},
});

export const { setLocation, setDate, setDateChange } = searchSlice.actions;

export default searchSlice.reducer;
