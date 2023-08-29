import { Divider, IconButton, Paper } from "@mui/material";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import CombinedPicker from "./components/CustomDatePicker";
import AutocompleteInput from "./components/AutocompleteInput";

import { useDispatch, useSelector } from "react-redux";
import getWeather from "../../services/getWeather";
import { setWeather } from "../weather/weatherSlice";

const SearchForm = () => {
	const dispatch = useDispatch();
	const { date, location } = useSelector((state) => state.search);
	const { temperatureUnit } = useSelector((state) => state.settings);

	const handleClick = async () => {
		const data = await getWeather(date, location, temperatureUnit);
		console.log(data);
		console.log(location);
		dispatch(setWeather({ ...data, location }));
	};

	return (
		<Paper component="div" sx={{ p: "2px 4px", display: "flex", alignItems: "center", maxWidth: 400 }}>
			<CombinedPicker></CombinedPicker>

			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

			<AutocompleteInput></AutocompleteInput>

			<IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleClick}>
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
