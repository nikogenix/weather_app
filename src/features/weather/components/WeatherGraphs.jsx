import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

dayjs.extend(utc);
dayjs.extend(timezone);

const WeatherGraphs = ({ chartData, data }) => {
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
									max: Number(chartData.hours[c[0].data.length - 1]),
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
	);
};

export default WeatherGraphs;
