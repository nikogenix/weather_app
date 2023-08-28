import { Divider, IconButton, Paper } from "@mui/material";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import CombinedPicker from "./components/CustomDatePicker";
import AutocompleteInput from "./components/AutocompleteInput";

const SearchForm = () => {
	return (
		<Paper component="div" sx={{ p: "2px 4px", display: "flex", alignItems: "center", maxWidth: 400 }}>
			<CombinedPicker></CombinedPicker>

			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

			<AutocompleteInput></AutocompleteInput>

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
