import { useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Icon, Paper, Typography } from "@mui/material";

import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import MasksIcon from "@mui/icons-material/Masks";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

import { formatWeatherData } from "../../../utils/formatWeatherData";
import WeatherTimelineHourlyDetail from "./WeatherTimelineHourlyDetail";

dayjs.extend(utc);
dayjs.extend(timezone);

const WeatherTimelineHourly = ({ chartData, hourSelection, handleHourChange, daySelection, date }) => {
	const containerRef = useRef(null);
	const buttonRefs = useRef([]);

	const isMobile = useMediaQuery("(pointer:coarse)");

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
						<Typography
							sx={{
								textTransform: "none",
								fontSize: 12,
								mb: 1,
								height: "3em",
								display: "flex",
								alignItems: "center",
							}}
						>
							{formatWeatherData(chartData.weathercode[i], undefined, "weather description")}
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: hourSelection === hour ? "space-between" : "center",
								width: "100%",
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
								}}
							>
								<WeatherTimelineHourlyDetail
									name="temperature"
									icon={<ThermostatIcon sx={{ mr: 0.5, fontSize: 15 }} />}
									value={formatWeatherData(chartData.temperature[i], undefined, "degree")}
									isMobile={isMobile}
								/>
								<WeatherTimelineHourlyDetail
									name="feels like"
									icon={<SensorOccupiedIcon sx={{ mr: 0.5, fontSize: 15 }} />}
									value={formatWeatherData(chartData.feelsLike[i], undefined, "degree")}
									isMobile={isMobile}
								/>
								<WeatherTimelineHourlyDetail
									name="precipitation chance"
									icon={<WaterDropIcon sx={{ mr: 0.5, fontSize: 15 }} />}
									value={formatWeatherData(chartData.precipitation[i], undefined, "percentage")}
									isMobile={isMobile}
								/>
								<WeatherTimelineHourlyDetail
									name="wind speed"
									icon={<AirIcon sx={{ mr: 0.5, fontSize: 15 }} />}
									value={formatWeatherData(chartData.wind[i], chartData.windUnit, "misc integer")}
									isMobile={isMobile}
								/>
								<WeatherTimelineHourlyDetail
									name="UV"
									icon={<SolarPowerIcon sx={{ mr: 0.5, fontSize: 15 }} />}
									value={formatWeatherData(chartData.uv[i], undefined, "unitless")}
									isMobile={isMobile}
								/>
								<WeatherTimelineHourlyDetail
									name="air quality"
									icon={<MasksIcon sx={{ mr: 0.5, fontSize: 15 }} />}
									value={formatWeatherData(chartData.aqi[i], undefined, "unitless")}
									isMobile={isMobile}
								/>
							</Box>

							{hourSelection === hour && (
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										flexDirection: "column",
									}}
								>
									<WeatherTimelineHourlyDetail
										name="surface pressure"
										icon={<CompressIcon sx={{ mr: 0.5, fontSize: 15 }} />}
										value={formatWeatherData(chartData.pressure[i], "hPa", "misc integer")}
										isMobile={isMobile}
									/>
									<WeatherTimelineHourlyDetail
										name="visibility"
										icon={<VisibilityIcon sx={{ mr: 0.5, fontSize: 15 }} />}
										value={formatWeatherData(
											chartData.visibility[i],
											chartData.visibilityUnit,
											"misc integer"
										)}
										isMobile={isMobile}
									/>
									<WeatherTimelineHourlyDetail
										name="precipitation quantity"
										icon={<FormatColorFillIcon sx={{ mr: 0.5, fontSize: 15 }} />}
										value={formatWeatherData(
											chartData.precipitationQty[i],
											chartData.precipitationQtyUnit,
											"misc integer"
										)}
										isMobile={isMobile}
									/>
									<WeatherTimelineHourlyDetail
										name="snow depth"
										icon={<AcUnitIcon sx={{ mr: 0.5, fontSize: 15 }} />}
										value={formatWeatherData(
											chartData.snowDepth[i],
											chartData.visibilityUnit,
											"misc"
										)}
										isMobile={isMobile}
									/>
									<WeatherTimelineHourlyDetail
										name="cloud cover"
										icon={<CloudIcon sx={{ mr: 0.5, fontSize: 15 }} />}
										value={formatWeatherData(chartData.cloudcover[i], undefined, "percentage")}
										isMobile={isMobile}
									/>
									<WeatherTimelineHourlyDetail
										name="dew point"
										icon={<InvertColorsIcon sx={{ mr: 0.5, fontSize: 15 }} />}
										value={formatWeatherData(chartData.dew[i], undefined, "degree")}
										isMobile={isMobile}
									/>
								</Box>
							)}
						</Box>
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Paper>
	);
};

export default WeatherTimelineHourly;
