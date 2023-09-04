import * as React from "react";
import dayjs from "dayjs";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Divider, Icon, Paper, Typography } from "@mui/material";

import { formatWeatherData } from "../../../utils/formatWeatherData";

export default function WeatherGraphs({ data }) {
	const [daySelection, setDaySelection] = React.useState("");

	const handleChange = (event, newAlignment) => {
		setDaySelection(newAlignment);
	};

	React.useEffect(() => {
		const day = data?.daily?.time[0] || "";
		setDaySelection(day);
	}, [data]);

	return (
		<Paper sx={{ width: "100%", overflowX: "scroll", p: 0, my: 3 }}>
			<ToggleButtonGroup value={daySelection} exclusive onChange={handleChange} aria-label="Platform">
				{data.daily.time.map((day, i) => (
					<ToggleButton
						key={i}
						value={day}
						sx={{ display: "flex", flexDirection: "column", width: daySelection === day ? 200 : 100 }}
					>
						<Typography sx={{ textTransform: "none" }}>{dayjs(day).format("MMM D")} </Typography>
						<Icon
							component="i"
							sx={{ fontSize: 30, overflow: "visible", width: "min-content", m: 2 }}
							baseClassName={`wi ${formatWeatherData(data.daily.weathercode[i], 1, "weather icon")}`}
							aria-hidden={false}
							aria-label={`weather icon - ${formatWeatherData(
								data.daily.weathercode[i],
								undefined,
								"weather description"
							)}`}
							role="img"
						></Icon>
						<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
							<Typography fontSize={15}>
								{formatWeatherData(data.daily.temperature_2m_min[i], undefined, "degree")}
							</Typography>
							<Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
							<Typography fontSize={15} fontWeight={"bold"}>
								{formatWeatherData(data.daily.temperature_2m_max[i], undefined, "degree")}
							</Typography>
						</Box>
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Paper>
	);
}
