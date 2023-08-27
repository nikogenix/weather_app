import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import getLocations from "../../../services/getLocations";

export default function AutocompleteInput() {
	const [value, setValue] = React.useState(null);
	const [inputValue, setInputValue] = React.useState("");
	const [options, setOptions] = React.useState([]);

	const fetch = React.useMemo(
		() =>
			debounce(async (request, callback) => {
				const results = await getLocations(request.input);
				callback(results);
			}, 1000),
		[]
	);

	React.useEffect(() => {
		if (inputValue === "") {
			setOptions(value ? [value] : []);
			return;
		}

		fetch({ input: inputValue }, (results) => {
			let newOptions = [];

			if (value) {
				newOptions = [value];
			}

			if (results) {
				newOptions = [...newOptions, ...results];
			}

			setOptions(newOptions);
		});

		console.log(value, inputValue);
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			sx={{ width: 300, ml: 1, flex: 1 }}
			getOptionLabel={(option) => option.name}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			noOptionsText="search for a location..."
			onChange={(event, newValue) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} fullWidth />}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						<Grid container alignItems="center">
							<Grid item sx={{ display: "flex", width: 44 }}>
								<LocationOnIcon sx={{ color: "text.secondary" }} />
							</Grid>
							<Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
								<Box component="span">{option.name}</Box>
								<Typography variant="body2" color="text.secondary">
									{option.country}
								</Typography>
							</Grid>
						</Grid>
					</li>
				);
			}}
		/>
	);
}
