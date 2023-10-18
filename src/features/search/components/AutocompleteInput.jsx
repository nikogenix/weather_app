import * as React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { debounce } from "@mui/material/utils";
import getLocations from "../../../services/getLocations";
import { setLocation } from "../searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Popper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomPopper = function (props) {
	const theme = useTheme();
	const isScreenSmallAndUp = useMediaQuery(theme.breakpoints.up("sm"));

	const size = !isScreenSmallAndUp ? "100%" : document.getElementById("autocomplete-form").offsetWidth;
	const position = !isScreenSmallAndUp ? "" : "-61px 0";

	const paddingHorizontal = !isScreenSmallAndUp ? 17 : 0;

	return (
		<Popper
			{...props}
			style={{
				width: size,
				translate: position,
				paddingLeft: paddingHorizontal,
				paddingRight: paddingHorizontal,
				paddingTop: 12,
			}}
			placement="bottom-start"
		/>
	);
};

export default function AutocompleteInput() {
	const [inputValue, setInputValue] = React.useState("");
	const [options, setOptions] = React.useState([]);

	const dispatch = useDispatch();
	const { location } = useSelector((state) => state.search);

	const handleLocationChange = (newValue) => {
		if (newValue !== null) dispatch(setLocation(newValue));
	};

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
			setOptions([]);
			return;
		}

		fetch({ input: inputValue }, (results) => {
			let newOptions = [];

			if (results) {
				newOptions = [...results];
			}

			setOptions(newOptions);
		});
	}, [location, inputValue, fetch]);

	return (
		<Autocomplete
			sx={{ width: { xs: "18vw", sm: 185, md: 300 }, ml: 1, flex: 1, border: "none" }}
			getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			clearOnBlur={false}
			value={location}
			inputValue={inputValue}
			freeSolo
			onChange={(event, newValue) => {
				handleLocationChange(newValue);
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			PopperComponent={CustomPopper}
			renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						<Grid container alignItems="center" sx={{ px: { xs: "5%", sm: "0%" } }}>
							<Grid item sx={{ display: "flex", width: 40 }}>
								<LocationOnIcon sx={{ color: "text.secondary" }} />
							</Grid>
							<Grid item sx={{ width: "calc(100% - 40px)", wordWrap: "break-word" }}>
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
