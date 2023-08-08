import { useSelector, useDispatch } from "react-redux";
import { setLocation, setDate } from "./searchSlice";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import CombinedPicker from "./components/CustomDatePicker";

const SearchForm = () => {
	const dispatch = useDispatch();
	const { location, date } = useSelector((state) => state.search);

	const handleLocationChange = (event) => {
		dispatch(setLocation(event.target.value));
	};

	const handleDateChange = (newDate) => {
		dispatch(setDate(newDate));
	};

	return (
		<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", maxWidth: 400 }}>
			<CombinedPicker />

			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

			<InputBase sx={{ ml: 1, flex: 1 }} inputProps={{ "aria-label": "search for a location" }} />
			<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
			<IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
				<BookmarksIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchForm;
