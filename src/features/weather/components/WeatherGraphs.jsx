import * as React from "react";

import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Container, Divider, Icon, Paper, Typography } from "@mui/material";

import "../../../assets/css/weather-icons.min.css";
import "../../../assets/css/weather-icons-wind.min.css";

import { WEATHER_CODES } from "../../../data/weather";

export default function WeatherGraphs() {
	const { data } = useSelector((state) => state.weather);
	const { date, dateChange } = useSelector((state) => state.search);

	const selectedTime =
		Object.getOwnPropertyNames(data).length === 0
			? "00:00"
			: dateChange
			? `${new Date(date).getHours().toString().padStart(2, "0")}:00`
			: data.current_weather.time.slice(11, 16);
	const forecastStartIndex = Number(selectedTime.slice(0, 2));

	const [daySelection, setDaySelection] = React.useState("");

	const handleChange = (event, newAlignment) => {
		setDaySelection(newAlignment);
	};

	React.useEffect(() => {
		const day = data?.daily?.time[0] || "";
		setDaySelection(day);
	}, [data]);

	if (Object.getOwnPropertyNames(data).length === 0) return <></>;

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
							baseClassName={`wi ${WEATHER_CODES[Number(data.daily.weathercode[i])].dayIcon}`}
							aria-hidden={false}
							aria-label={`weather icon: ${WEATHER_CODES[Number(data.daily.weathercode[i])].description}`}
							role="img"
						></Icon>
						<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
							<Typography fontSize={15}>{data.daily.temperature_2m_min[i]}°</Typography>
							<Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
							<Typography fontSize={15} fontWeight={"bold"}>
								{data.daily.temperature_2m_max[i]}°
							</Typography>
						</Box>
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Paper>
	);
}
