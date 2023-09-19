import * as React from "react";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Divider, Icon, Paper, Tooltip, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import MasksIcon from "@mui/icons-material/Masks";

import { formatWeatherData } from "../../../utils/formatWeatherData";

export default function WeatherGraphs({ data }) {
	const [daySelection, setDaySelection] = React.useState("");
	const [hourSelection, setHourSelection] = React.useState("");
	const [chartData, setChartData] = React.useState({
		hours: [],
		temperature: [],
		feelsLike: [],
		precipitation: [],
		wind: [],
		uv: [],
		aqi: [],
	});

	const handleChange = (event, newDay) => {
		setDaySelection(newDay);
	};

	const handleHourChange = (event, newHour) => {
		setHourSelection(newHour);
	};

	React.useEffect(() => {
		const day = data ? data.daily.time[0] : "";
		setDaySelection(day);
	}, [data]);

	React.useEffect(() => {
		if (data.hourly) {
			const start = data.hourly.time.findIndex((c) => c.includes(daySelection));
			const end = data.hourly.time.findLastIndex((c) => c.includes(daySelection)) + 1;

			const hours = data.hourly.time.slice(start, end + 1).map((c) => dayjs.tz(c, data.location.timezone));
			const temperature = data.hourly.temperature_2m.slice(start, end + 1);
			const feelsLike = data.hourly.apparent_temperature.slice(start, end + 1);
			const precipitation = data.hourly.precipitation_probability.slice(start, end + 1);
			const wind = data.hourly.windspeed_10m.slice(start, end + 1);
			const windUnit = data.hourly_units.windspeed_10m;
			const uv = data.hourly.uv_index.slice(start, end + 1);
			const aqi = data.aqi.hourly.european_aqi.slice(start, end + 1);
			const weathercode = data.hourly.weathercode.slice(start, end + 1);

			setChartData({
				hours,
				temperature,
				feelsLike,
				precipitation,
				wind,
				windUnit,
				uv,
				aqi,
				weathercode,
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
			valueFormatter: (v) => v + "°",
		},
		{
			yAxisKey: "linearAxis",
			data: chartData.feelsLike,
			color: "#bab0ab",
			label: "feels like",
			showMark: false,
			curve: "natural",
			valueFormatter: (v) => v + "°",
		},
		{
			yAxisKey: "linearAxis",
			data: chartData.precipitation,
			color: "#4e79a7",
			label: "precipitation chance",
			showMark: false,
			curve: "natural",
			area: true,
			valueFormatter: (v) => v + "%",
		},
		{
			yAxisKey: "linearAxis",
			data: chartData.wind,
			color: "#bab0ab",
			label: "wind speed",
			showMark: false,
			curve: "natural",
			valueFormatter: (v) => `${v} ${chartData.windUnit}`,
		},
		{
			yAxisKey: "linearAxis",
			data: chartData.uv,
			color: "#f28e2c",
			label: "UV",
			showMark: false,
			curve: "natural",
			area: true,
		},
		{
			yAxisKey: "linearAxis",
			data: chartData.aqi,
			color: "#4e79a7",
			label: "air quality",
			showMark: false,
			curve: "natural",
		},
	];

	const filteredTempSeries = series.filter(
		(c) => !c.data.includes(null) && c.data.length !== 0 && (c.label === "temperature" || c.label === "feels like")
	);
	const filteredPrecipitationSeries = series.filter(
		(c) => !c.data.includes(null) && c.data.length !== 0 && c.label === "precipitation chance"
	);
	const filtereWindSeries = series.filter(
		(c) => !c.data.includes(null) && c.data.length !== 0 && c.label === "wind speed"
	);
	const filteredUvSeries = series.filter((c) => !c.data.includes(null) && c.data.length !== 0 && c.label === "UV");
	const filteredAqiSeries = series.filter(
		(c) => !c.data.includes(null) && c.data.length !== 0 && c.label === "air quality"
	);

	const dateValueFormatter = (date) => dayjs.tz(date, data.location.timezone).format("h A");

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

							{day === daySelection && (
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip title="sunrise" placement="top" arrow>
										<Box sx={{ mr: 2, position: "relative", top: -30 }}>
											<Icon
												component="i"
												sx={{ fontSize: 15, overflow: "visible", width: "min-content", m: 1 }}
												baseClassName={`wi wi-sunrise`}
												aria-hidden={false}
												aria-label={`sunrise icon`}
												role="img"
											></Icon>
											<Typography fontSize={12}>{data.daily.sunrise[i].slice(-5)}</Typography>
										</Box>
									</Tooltip>
									<Icon
										component="i"
										sx={{ fontSize: 30, overflow: "visible", width: "min-content", m: 2 }}
										baseClassName={`wi ${formatWeatherData(
											data.daily.weathercode[i],
											1,
											"weather icon"
										)}`}
										aria-hidden={false}
										aria-label={`weather icon - ${formatWeatherData(
											data.daily.weathercode[i],
											undefined,
											"weather description"
										)}`}
										role="img"
									></Icon>

									<Tooltip title="sunset" placement="top" arrow>
										<Box sx={{ ml: 2, position: "relative", top: -30 }}>
											<Icon
												component="i"
												sx={{ fontSize: 15, overflow: "visible", width: "min-content", m: 1 }}
												baseClassName={`wi wi-moonrise`}
												aria-hidden={false}
												aria-label={`moonrise icon (sunset time)`}
												role="img"
											></Icon>
											<Typography fontSize={12}>{data.daily.sunset[i].slice(-5)}</Typography>
										</Box>
									</Tooltip>
								</Box>
							)}

							{day !== daySelection && (
								<Icon
									component="i"
									sx={{ fontSize: 30, overflow: "visible", width: "min-content", m: 2 }}
									baseClassName={`wi ${formatWeatherData(
										data.daily.weathercode[i],
										1,
										"weather icon"
									)}`}
									aria-hidden={false}
									aria-label={`weather icon - ${formatWeatherData(
										data.daily.weathercode[i],
										undefined,
										"weather description"
									)}`}
									role="img"
								></Icon>
							)}

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
			<Paper sx={{ width: "100%", overflowX: "scroll", p: 0 }}>
				<ToggleButtonGroup value={hourSelection} exclusive onChange={handleHourChange} aria-label="Platform">
					{chartData.hours.map((hour, i) => (
						<ToggleButton
							key={i}
							value={hour}
							sx={{ display: "flex", flexDirection: "column", width: hourSelection === hour ? 200 : 100 }}
						>
							<Typography sx={{ textTransform: "none" }}>{dayjs(hour).format("h A")} </Typography>
							<Icon
								component="i"
								sx={{ fontSize: 30, overflow: "visible", width: "min-content", m: 2 }}
								baseClassName={`wi ${formatWeatherData(chartData.weathercode[i], 1, "weather icon")}`}
								aria-hidden={false}
								aria-label={`weather icon - ${formatWeatherData(
									chartData.weathercode[i],
									undefined,
									"weather description"
								)}`}
								role="img"
							></Icon>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									width: "100%",
									flexDirection: "column",
								}}
							>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip placement="left" title="temperature" arrow>
										<ThermostatIcon sx={{ mr: 0.5, fontSize: 15 }} />
									</Tooltip>
									<Typography fontSize={12}>
										{formatWeatherData(chartData.temperature[i], undefined, "degree")}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip placement="left" title="feels like" arrow>
										<SensorOccupiedIcon sx={{ mr: 0.5, fontSize: 15 }} />
									</Tooltip>
									<Typography sx={{ textTransform: "none" }} fontSize={12}>
										{formatWeatherData(chartData.feelsLike[i], undefined, "degree")}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip placement="left" title="precipitation chance" arrow>
										<WaterDropIcon sx={{ mr: 0.5, fontSize: 15 }} />
									</Tooltip>
									<Typography sx={{ textTransform: "none" }} fontSize={12}>
										{formatWeatherData(chartData.precipitation[i], undefined, "percentage")}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip placement="left" title="wind speed" arrow>
										<AirIcon sx={{ mr: 0.5, fontSize: 15 }} />
									</Tooltip>
									<Typography sx={{ textTransform: "none" }} fontSize={12}>
										{formatWeatherData(chartData.wind[i], chartData.windUnit, "misc")}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip placement="left" title="UV" arrow>
										<SolarPowerIcon sx={{ mr: 0.5, fontSize: 15 }} />
									</Tooltip>
									<Typography sx={{ textTransform: "none" }} fontSize={12}>
										{formatWeatherData(chartData.uv[i], undefined, "unitless")}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Tooltip placement="left" title="air quality" arrow>
										<MasksIcon sx={{ mr: 0.5, fontSize: 15 }} />
									</Tooltip>
									<Typography sx={{ textTransform: "none" }} fontSize={12}>
										{formatWeatherData(chartData.aqi[i], undefined, "unitless")}
									</Typography>
								</Box>
							</Box>
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Paper>
			<Paper sx={{ pt: 3 }}>
				{[
					filteredTempSeries,
					filteredPrecipitationSeries,
					filtereWindSeries,
					filteredUvSeries,
					filteredAqiSeries,
				].map((c) => {
					return (
						c.length > 0 && (
							<LineChart
								key={c[0].label}
								xAxis={[
									{
										data: chartData.hours,
										scaleType: "time",
										tickMinStep: 3600 * 1000 * 4,
										valueFormatter: dateValueFormatter,
										min: Number(chartData.hours[0]),
										max: Number(chartData.hours[24]),
									},
								]}
								yAxis={[
									{
										id: "linearAxis",
										scaleType: "linear",
										min: c[0].label === "air quality" ? 0 : undefined,
									},
								]}
								series={c}
								leftAxis="linearAxis"
								height={180}
								sx={{
									"--ChartsLegend-itemMarkSize": "10px",
									"--ChartsLegend-rootOffsetX": "7em",
									"--ChartsLegend-rootOffsetY": "-1em",
								}}
								legend={{
									direction: "column",
									position: {
										vertical: "top",
										horizontal: "left",
									},
								}}
								margin={{
									top: 50,
									bottom: 30,
									left: 40,
									right: 40,
								}}
								axisHighlight={{
									x: "band",
									y: "none",
								}}
							/>
						)
					);
				})}
			</Paper>
		</>
	);
}
