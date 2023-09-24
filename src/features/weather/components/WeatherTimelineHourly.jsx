import { useEffect, useRef } from "react";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Icon, Paper, Tooltip, Typography } from "@mui/material";

import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import MasksIcon from "@mui/icons-material/Masks";

import { formatWeatherData } from "../../../utils/formatWeatherData";

dayjs.extend(utc);
dayjs.extend(timezone);

const WeatherTimelineHourly = ({ chartData, hourSelection, handleHourChange, daySelection, date }) => {
	const containerRef = useRef(null);
	const buttonRefs = useRef([]);

	useEffect(() => {
		const hourIndex = daySelection == dayjs(date).format("YYYY-MM-DD") ? Number(dayjs(date).format("H")) : 0;
		const hour =
			chartData.hours.length > 0 && daySelection == dayjs(date).format("YYYY-MM-DD")
				? chartData.hours[hourIndex]
				: chartData.hours[0];

		const container = containerRef.current;
		const button = buttonRefs.current[hourIndex];

		if (button) {
			const style = getComputedStyle(button);
			const size = parseFloat(style.width) + style.margin.split(" ").reduce((acc, c) => acc + parseFloat(c), 0);

			container.scroll({
				left: hourIndex * size,
				behavior: "smooth",
			});
		}

		handleHourChange(undefined, hour);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartData, date, daySelection]);

	return (
		<Paper ref={containerRef} sx={{ width: "100%", overflowX: "scroll", p: 0 }}>
			<ToggleButtonGroup value={hourSelection} exclusive onChange={handleHourChange} aria-label="Platform">
				{chartData.hours.map((hour, i) => (
					<ToggleButton
						ref={(ref) => (buttonRefs.current[i] = ref)}
						key={i}
						value={hour}
						sx={{
							display: "flex",
							flexDirection: "column",
							width: hourSelection === hour ? 200 : 100,
						}}
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
	);
};

export default WeatherTimelineHourly;