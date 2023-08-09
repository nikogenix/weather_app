import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		location: "",
		date: "",
	},
	reducers: {
		setLocation: (state, action) => {
			state.location = action.payload;
		},
		setDate: (state, action) => {
			state.selectedDate = action.payload;
		},
	},
});

export const { setLocation, setDate } = searchSlice.actions;

export default searchSlice.reducer;
