import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { formatWeatherData } from "../../../utils/formatWeatherData";

import { Box, Divider, Icon, Paper, Tooltip, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

dayjs.extend(utc);
dayjs.extend(timezone);

const WeatherTimelineDaily = ({ data, daySelection, handleDayChange }) => {
	return (
		<Paper
			sx={{
				width: "100%",
				overflowX: "scroll",
				p: 0,
				mt: 3,
				background: "linear-gradient(135deg, rgba(106,85,145,0.15) 0%, rgba(255,255,255,0) 40% 100%)",
			}}
		>
			<ToggleButtonGroup value={daySelection} exclusive onChange={handleDayChange} aria-label="Platform">
				{data.daily.time.map((day, i) => (
					<ToggleButton
						key={i}
						value={day}
						sx={{
							display: "flex",
							flexDirection: "column",
							width: daySelection === day ? 200 : 100,
						}}
					>
						<Typography sx={{ textTransform: "none" }}>{dayjs(day).format("MMM D")} </Typography>

						{day === daySelection && (
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Tooltip title="sunrise" placement="top" arrow>
									<Box sx={{ mr: 2, position: "relative", top: -30 }}>
										<Icon
											component="i"
											sx={{
												fontSize: 15,
												overflow: "visible",
												width: "min-content",
												m: 1,
											}}
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
											sx={{
												fontSize: 15,
												overflow: "visible",
												width: "min-content",
												m: 1,
											}}
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
								baseClassName={`wi ${formatWeatherData(data.daily.weathercode[i], 1, "weather icon")}`}
								aria-hidden={false}
								aria-label={`weather icon - ${formatWeatherData(
									data.daily.weathercode[i],
									undefined,
									"weather description"
								)}`}
								role="img"
							></Icon>
						)}

						<Typography
							sx={{
								textTransform: "none",
								fontSize: 12,
								mb: 1,
								height: "100%",
								display: "flex",
								alignItems: "center",
							}}
						>
							{formatWeatherData(data.daily.weathercode[i], undefined, "weather description")}
						</Typography>

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
};

export default WeatherTimelineDaily;
