import dayjs from "dayjs";

import { Box, Card, CardContent, CardHeader, Icon, Typography } from "@mui/material";
import CurrentWeatherDetail from "./CurrentWeatherDetail";

import { formatWeatherData } from "../../../utils/formatWeatherData";
import AirQualityTable from "./AirQualityTable";
import UvIndexTable from "./UvIndexTable";
import Recommendations from "../../recommendations";

const CurrentWeather = ({ data, selectedTime, forecastStartIndex, weatherWarning }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: "space-between",
				flexWrap: "wrap",
				alignContent: "space-between",
			}}
		>
			{/* weather */}
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					background: "linear-gradient(135deg, rgba(255,255,255,0) 0% 60%, rgba(106,85,145,0.1) 90%)",
					width: { xs: "100%", sm: 400, lg: "48%" },
					m: 1,
					mx: { xs: "auto", md: "initial" },
				}}
			>
				<CardHeader
					title={`${data.location.name}${data.location.admin1 ? `, ${data.location.admin1}` : ""}${
						data.location.country ? `, ${data.location.country}` : ""
					}`}
					subheader={
						/^[+-]\d+$/.test(data.timezone_abbreviation)
							? `${dayjs(data.hourly.time[forecastStartIndex]).format("MMMM D,")} ${selectedTime} UTC${
									data.timezone_abbreviation
							  }`
							: `${dayjs(data.hourly.time[forecastStartIndex]).format("MMMM D,")} ${selectedTime} ${
									data.timezone_abbreviation
							  }`
					}
					titleTypographyProps={{ fontSize: 20, textAlign: "center" }}
					subheaderTypographyProps={{ fontSize: 15, textAlign: "center" }}
					sx={{ pt: 3, pl: 3 }}
				/>
				<CardContent
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						flexDirection: "column",
						width: 400,
						alignSelf: "center",
					}}
				>
					{/* icon and temperature */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyItems: "center",
						}}
					>
						<Box
							sx={{
								display: "flex",
								justifyItems: "center",
								flexFlow: "column",
								alignItems: "center",
							}}
						>
							<Icon
								component="i"
								sx={{ fontSize: 80, overflow: "visible", width: "min-content" }}
								baseClassName={`wi ${formatWeatherData(
									data.hourly.weathercode[forecastStartIndex],
									data.hourly.is_day[forecastStartIndex],
									"weather icon"
								)}`}
								aria-hidden={false}
								aria-label={`weather icon - ${formatWeatherData(
									data.hourly.weathercode[forecastStartIndex],
									undefined,
									"weather description"
								)}`}
								role="img"
							></Icon>
						</Box>
						<Box sx={{ m: 3 }}>
							<Typography fontSize={40}>
								{formatWeatherData(
									data.hourly.temperature_2m[forecastStartIndex],
									data.hourly_units.temperature_2m,
									"temperature"
								)}
							</Typography>
							<Typography>
								{formatWeatherData(
									data.hourly.weathercode[forecastStartIndex],
									undefined,
									"weather description"
								)}
							</Typography>
							<Typography>
								{formatWeatherData(
									data.hourly.apparent_temperature[forecastStartIndex],
									data.hourly_units.temperature_2m,
									"apparent temperature"
								)}
							</Typography>
						</Box>
					</Box>

					{/* weather details */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							width: { xs: "100%", sm: "100%" },
							mt: { xs: 3, sm: 0 },
						}}
					>
						<Box sx={{ mr: 1, width: "40%" }}>
							<CurrentWeatherDetail
								header="air quality"
								value={data.aqi.hourly.european_aqi[forecastStartIndex]}
								unit={data.aqi.hourly_units.european_aqi}
								type={"aqi"}
								tooltip={<AirQualityTable value={data.aqi.hourly.european_aqi[forecastStartIndex]} />}
							/>
							<CurrentWeatherDetail
								header="wind"
								value={data.hourly.windspeed_10m[forecastStartIndex]}
								unit={data.daily_units.windspeed_10m_max}
								secondaryValue={data.hourly.winddirection_10m[forecastStartIndex]}
								type={"misc"}
							/>
							<CurrentWeatherDetail
								header="humidity"
								value={data.hourly.relativehumidity_2m[forecastStartIndex]}
								type="percentage"
							/>
							<CurrentWeatherDetail
								header="visibility"
								value={data.hourly.visibility[forecastStartIndex]}
								unit={data.hourly_units.visibility}
								type="misc integer"
							/>
						</Box>

						<Box sx={{ textAlign: "right", ml: 1, width: "40%" }}>
							<CurrentWeatherDetail
								header="UV index"
								value={data.hourly.uv_index[forecastStartIndex]}
								type={"unitless"}
								tooltip={<UvIndexTable value={data.hourly.uv_index[forecastStartIndex]} />}
							/>
							<CurrentWeatherDetail
								header="surface pressure"
								value={data.hourly.surface_pressure[forecastStartIndex]}
								unit={data.hourly_units.surface_pressure}
								type="misc integer"
							/>
							<CurrentWeatherDetail
								header="dew point"
								value={data.hourly.dewpoint_2m[forecastStartIndex]}
								unit={data.hourly_units.dewpoint_2m}
								type="temperature"
							/>
							<CurrentWeatherDetail
								header="precipitation chance"
								value={data.hourly.precipitation_probability[forecastStartIndex]}
								type={"percentage"}
							/>
						</Box>
					</Box>
				</CardContent>
			</Card>

			{/* recommendations */}
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					background: "linear-gradient(135deg, rgba(106,85,145,0.15) 0%, rgba(255,255,255,0) 40% 100%)",
					width: { xs: "100%", sm: 400, lg: "48%" },
					m: 1,

					mx: { xs: "auto", md: "initial" },
				}}
			>
				<CardHeader
					title="recommendations"
					subheader="...from now till the end of the day"
					titleTypographyProps={{ fontSize: 20, textAlign: "center" }}
					subheaderTypographyProps={{ fontSize: 15, textAlign: "center" }}
					sx={{ pt: 3, pr: 3 }}
				/>
				<CardContent>
					<Recommendations data={data} type={"full"} iconSize={50} alignment={"center"} />
				</CardContent>
			</Card>
		</Box>
		// <Card sx={{ display: "flex", flexDirection: "column", px: { xs: 0, md: 0, lg: 20 } }}>
		// 	<Box
		// 		sx={{
		// 			display: "flex",
		// 			flexDirection: { xs: "column", md: "row" },
		// 			justifyContent: "center",
		// 			alignContent: "center",
		// 			flexWrap: "wrap",
		// 			width: "100%",
		// 		}}
		// 	>
		// 		{/* weather */}
		// 		<Box
		// 			sx={{
		// 				display: "flex",
		// 				flexDirection: "column",
		// 				background: "linear-gradient(135deg, rgba(255,255,255,0) 0% 60%, rgba(106,85,145,0.1) 90%)",
		// 				width: { xs: "100%", md: 400 },
		// 			}}
		// 		>
		// 			<CardHeader
		// 				title={`${data.location.name}${data.location.admin1 ? `, ${data.location.admin1}` : ""}${
		// 					data.location.country ? `, ${data.location.country}` : ""
		// 				}`}
		// 				subheader={
		// 					/^[+-]\d+$/.test(data.timezone_abbreviation)
		// 						? `${dayjs(data.hourly.time[forecastStartIndex]).format(
		// 								"MMMM D,"
		// 						  )} ${selectedTime} UTC${data.timezone_abbreviation}`
		// 						: `${dayjs(data.hourly.time[forecastStartIndex]).format("MMMM D,")} ${selectedTime} ${
		// 								data.timezone_abbreviation
		// 						  }`
		// 				}
		// 				titleTypographyProps={{ fontSize: 20 }}
		// 				subheaderTypographyProps={{ fontSize: 15 }}
		// 				sx={{ pt: 3, pl: 3 }}
		// 			/>
		// 			<CardContent
		// 				sx={{
		// 					display: "flex",
		// 					alignItems: "center",
		// 					justifyContent: "space-around",
		// 					flexDirection: "column",
		// 					width: 400,
		// 					alignSelf: "left",
		// 				}}
		// 			>
		// 				{/* icon and temperature */}
		// 				<Box
		// 					sx={{
		// 						display: "flex",
		// 						alignItems: "center",
		// 						justifyItems: "center",
		// 					}}
		// 				>
		// 					<Box
		// 						sx={{
		// 							display: "flex",
		// 							justifyItems: "center",
		// 							flexFlow: "column",
		// 							alignItems: "center",
		// 						}}
		// 					>
		// 						<Icon
		// 							component="i"
		// 							sx={{ fontSize: 80, overflow: "visible", width: "min-content" }}
		// 							baseClassName={`wi ${formatWeatherData(
		// 								data.hourly.weathercode[forecastStartIndex],
		// 								data.hourly.is_day[forecastStartIndex],
		// 								"weather icon"
		// 							)}`}
		// 							aria-hidden={false}
		// 							aria-label={`weather icon - ${formatWeatherData(
		// 								data.hourly.weathercode[forecastStartIndex],
		// 								undefined,
		// 								"weather description"
		// 							)}`}
		// 							role="img"
		// 						></Icon>
		// 					</Box>
		// 					<Box sx={{ m: 3 }}>
		// 						<Typography fontSize={40}>
		// 							{formatWeatherData(
		// 								data.hourly.temperature_2m[forecastStartIndex],
		// 								data.hourly_units.temperature_2m,
		// 								"temperature"
		// 							)}
		// 						</Typography>
		// 						<Typography>
		// 							{formatWeatherData(
		// 								data.hourly.weathercode[forecastStartIndex],
		// 								undefined,
		// 								"weather description"
		// 							)}
		// 						</Typography>
		// 						<Typography>
		// 							{formatWeatherData(
		// 								data.hourly.apparent_temperature[forecastStartIndex],
		// 								data.hourly_units.temperature_2m,
		// 								"apparent temperature"
		// 							)}
		// 						</Typography>
		// 					</Box>
		// 				</Box>

		// 				{/* weather details */}
		// 				<Box
		// 					sx={{
		// 						display: "flex",
		// 						justifyContent: "center",
		// 						width: { xs: "100%", sm: "100%" },
		// 						mt: { xs: 3, sm: 0 },
		// 					}}
		// 				>
		// 					<Box sx={{ mr: 1, width: "40%" }}>
		// 						<CurrentWeatherDetail
		// 							header="air quality"
		// 							value={data.aqi.hourly.european_aqi[forecastStartIndex]}
		// 							unit={data.aqi.hourly_units.european_aqi}
		// 							type={"aqi"}
		// 							tooltip={
		// 								<AirQualityTable value={data.aqi.hourly.european_aqi[forecastStartIndex]} />
		// 							}
		// 						/>
		// 						<CurrentWeatherDetail
		// 							header="wind"
		// 							value={data.hourly.windspeed_10m[forecastStartIndex]}
		// 							unit={data.daily_units.windspeed_10m_max}
		// 							secondaryValue={data.hourly.winddirection_10m[forecastStartIndex]}
		// 							type={"misc"}
		// 						/>
		// 						<CurrentWeatherDetail
		// 							header="humidity"
		// 							value={data.hourly.relativehumidity_2m[forecastStartIndex]}
		// 							type="percentage"
		// 						/>
		// 						<CurrentWeatherDetail
		// 							header="visibility"
		// 							value={data.hourly.visibility[forecastStartIndex]}
		// 							unit={data.hourly_units.visibility}
		// 							type="misc integer"
		// 						/>
		// 					</Box>

		// 					<Box sx={{ textAlign: "right", ml: 1, width: "40%" }}>
		// 						<CurrentWeatherDetail
		// 							header="UV index"
		// 							value={data.hourly.uv_index[forecastStartIndex]}
		// 							type={"unitless"}
		// 							tooltip={<UvIndexTable value={data.hourly.uv_index[forecastStartIndex]} />}
		// 						/>
		// 						<CurrentWeatherDetail
		// 							header="surface pressure"
		// 							value={data.hourly.surface_pressure[forecastStartIndex]}
		// 							unit={data.hourly_units.surface_pressure}
		// 							type="misc integer"
		// 						/>
		// 						<CurrentWeatherDetail
		// 							header="dew point"
		// 							value={data.hourly.dewpoint_2m[forecastStartIndex]}
		// 							unit={data.hourly_units.dewpoint_2m}
		// 							type="temperature"
		// 						/>
		// 						<CurrentWeatherDetail
		// 							header="precipitation chance"
		// 							value={data.hourly.precipitation_probability[forecastStartIndex]}
		// 							type={"percentage"}
		// 						/>
		// 					</Box>
		// 				</Box>
		// 			</CardContent>
		// 		</Box>

		// 		{/* recommendations */}
		// 		<Box
		// 			sx={{
		// 				display: "flex",
		// 				flexDirection: "column",
		// 				background: "linear-gradient(135deg, rgba(106,85,145,0.15) 0%, rgba(255,255,255,0) 40% 100%)",
		// 				width: { xs: "100%", md: 400 },
		// 			}}
		// 		>
		// 			<CardHeader
		// 				title="recommendations"
		// 				subheader="...from now till the end of the day"
		// 				titleTypographyProps={{ fontSize: 20, textAlign: "center" }}
		// 				subheaderTypographyProps={{ fontSize: 15, textAlign: "center" }}
		// 				sx={{ pt: 3, pr: 3 }}
		// 			/>
		// 			<CardContent>
		// 				<Recommendations data={data} type={"full"} iconSize={50} alignment={"center"} />
		// 			</CardContent>
		// 		</Box>
		// 	</Box>
		// </Card>
	);
};

export default CurrentWeather;
