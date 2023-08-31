import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container, Typography } from "@mui/material";

export default function WeatherGraphs() {
	const [alignment, setAlignment] = React.useState("web");

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<Container sx={{ width: "100%", overflowX: "scroll", p: 0, m: 0 }} maxWidth="lg">
			<ToggleButtonGroup
				color="primary"
				value={alignment}
				exclusive
				onChange={handleChange}
				aria-label="Platform"
			>
				<ToggleButton
					value="1"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "1" ? 200 : "auto" }}
				>
					<Typography>31 Aug </Typography>
					<Typography>25°C </Typography>
				</ToggleButton>
				<ToggleButton
					value="2"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "2" ? 200 : "auto" }}
				>
					<Typography>1 Sep </Typography>
					<Typography>21°C </Typography>
				</ToggleButton>
				<ToggleButton
					value="3"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "3" ? 200 : "auto" }}
				>
					<Typography>2 Sep </Typography>
					<Typography>23°C </Typography>
				</ToggleButton>
				<ToggleButton
					value="3"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "3" ? 200 : "auto" }}
				>
					<Typography>2 Sep </Typography>
					<Typography>23°C </Typography>
				</ToggleButton>
				<ToggleButton
					value="3"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "3" ? 200 : "auto" }}
				>
					<Typography>2 Sep </Typography>
					<Typography>23°C </Typography>
				</ToggleButton>
				<ToggleButton
					value="3"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "3" ? 200 : "auto" }}
				>
					<Typography>2 Sep </Typography>
					<Typography>23°C </Typography>
				</ToggleButton>
				<ToggleButton
					value="3"
					sx={{ display: "flex", flexDirection: "column", width: alignment === "3" ? 200 : "auto" }}
				>
					<Typography>2 Sep </Typography>
					<Typography>23°C </Typography>
				</ToggleButton>
			</ToggleButtonGroup>
		</Container>
	);
}
