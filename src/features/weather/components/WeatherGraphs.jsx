import * as React from "react";
import dayjs from "dayjs";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Divider, Icon, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import { formatWeatherData } from "../../../utils/formatWeatherData";

export default function WeatherGraphs({ data }) {
	const [daySelection, setDaySelection] = React.useState("");
	const [chartData, setChartData] = React.useState({
		hours: [],
		temperature: [],
		feelsLike: [],
		precipitation: [],
		wind: [],
	});

	const handleChange = (event, newDay) => {
		setDaySelection(newDay);
	};

	React.useEffect(() => {
		const day = data?.daily?.time[0] || "";
		setDaySelection(day);
	}, [data]);

	React.useEffect(() => {
		if (data.hourly) {
			const start = data.hourly.time.findIndex((c) => c.includes(daySelection));
			const end = data.hourly.time.findLastIndex((c) => c.includes(daySelection));

			const hours = data.hourly.time.slice(start, end + 1).map((c) => c.slice(-5, -3));
			const temperature = data.hourly.temperature_2m.slice(start, end + 1);
			const feelsLike = data.hourly.apparent_temperature.slice(start, end + 1);
			const precipitation = data.hourly.precipitation_probability.slice(start, end + 1);
			const wind = data.hourly.windspeed_10m.slice(start, end + 1);

			setChartData({
				hours,
				temperature,
				feelsLike,
				precipitation,
				wind,
			});
		}
	}, [data, daySelection]);

	const series = [
		{
			yAxisKey: "linearAxis",
			data: chartData.temperature,
			color: "#f28e2c",
			label: "temperature",
			showMark: false,
			curve: "natural",
		},
		// {
		// 	yAxisKey: "linearAxis",
		// 	data: chartData.feelsLike,
		// 	color: "#bab0ab",
		// 	label: "feels like",
		// 	showMark: false,
		// 	curve: "natural",
		// },
		// {
		// 	yAxisKey: "linearAxis",
		// 	data: chartData.precipitation,
		// 	color: "#4e79a7",
		// 	label: "precipitation",
		// 	showMark: false,
		// 	curve: "natural",
		// },
		// {
		// 	yAxisKey: "linearAxis",
		// 	data: chartData.wind,
		// 	color: "#bab0ab",
		// 	label: "wind",
		// 	showMark: false,
		// 	curve: "natural",
		// },
	];

	const filteredSeries = series.filter((c) => !c.data.includes(null));

	return (
		<>
			<Paper sx={{ width: "100%", overflowX: "scroll", p: 0, mt: 3 }}>
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
			<Paper>
				{filteredSeries && (
					<LineChart
						xAxis={[{ data: chartData.hours }]}
						yAxis={[{ id: "linearAxis", scaleType: "linear" }]}
						series={filteredSeries}
						leftAxis="linearAxis"
						height={400}
						sx={{ "--ChartsLegend-itemWidth": "120px" }}
					/>
				)}
			</Paper>
		</>
	);
}
