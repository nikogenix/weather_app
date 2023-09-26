import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const CurrentWeather = lazy(() => import("./components/CurrentWeather"));
const WeatherTimelineDaily = lazy(() => import("./components/WeatherTimelineDaily"));
const WeatherTimelineHourly = lazy(() => import("./components/WeatherTimelineHourly"));
const WeatherGraphs = lazy(() => import("./components/WeatherGraphs"));
import Loading from "../../components/Loading";

dayjs.extend(utc);
dayjs.extend(timezone);

const Weather = () => {
	const { data } = useSelector((state) => state.weather);

	const { date, dateChange } = useSelector((state) => state.search);

	// if user didn't change the default time, the current weather will be provided based on the current local time of the forecast location
	const selectedTime =
		Object.getOwnPropertyNames(data).length === 0
			? "00:00"
			: dateChange
			? `${new Date(date).getHours().toString().padStart(2, "0")}:00`
			: data.current_weather.time.slice(11, 16);

	const forecastStartIndex =
		Object.getOwnPropertyNames(data).length === 0
			? 0
			: data.hourly.time.indexOf(dayjs(date).format("YYYY-MM-DDTHH:[00]"));

	const weatherWarning = false;

	const [daySelection, setDaySelection] = useState("");
	const [hourSelection, setHourSelection] = useState("");

	const [chartData, setChartData] = useState({
		hours: [],
		temperature: [],
		feelsLike: [],
		precipitation: [],
		wind: [],
		uv: [],
		aqi: [],
	});

	const handleDayChange = (event, newDay) => {
		if (newDay !== null) setDaySelection(newDay);
	};

	const handleHourChange = (event, newHour) => {
		if (newHour !== null) setHourSelection(newHour);
	};

	useEffect(() => {
		const day = dayjs(date).format("YYYY-MM-DD");
		setDaySelection(day);
	}, [date, data]);

	useEffect(() => {
		if (data.hourly) {
			const start = data.hourly.time.findIndex((c) => c.includes(daySelection));
			const end = data.hourly.time.findLastIndex((c) => c.includes(daySelection)) + 1;

			const hours = data.hourly.time.slice(start, end + 1).map((c) => dayjs.tz(c, data.location.timezone));
			const temperature = data.hourly.temperature_2m.slice(start, end + 1);
			const feelsLike = data.hourly.apparent_temperature.slice(start, end + 1);
			const precipitation = data.hourly.precipitation_probability.slice(start, end + 1);
			const wind = data.hourly.windspeed_10m.slice(start, end + 1);
			const windDirection = data.hourly.winddirection_10m.slice(start, end + 1);
			const windUnit = data.hourly_units.windspeed_10m;
			const uv = data.hourly.uv_index.slice(start, end + 1);
			const aqi = data.aqi.hourly.european_aqi.slice(start, end + 1);
			const weathercode = data.hourly.weathercode.slice(start, end + 1);
			const dew = data.hourly.dewpoint_2m.slice(start, end + 1);
			const cloudcover = data.hourly.cloudcover.slice(start, end + 1);
			const precipitationQty = data.hourly.precipitation.slice(start, end + 1);
			const precipitationQtyUnit = data.hourly_units.precipitation;

			const snowDepth = data.hourly.snow_depth.slice(start, end + 1);
			const pressure = data.hourly.surface_pressure.slice(start, end + 1);
			const visibility = data.hourly.visibility.slice(start, end + 1);
			const visibilityUnit = data.hourly_units.visibility;

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
				dew,
				cloudcover,
				precipitationQty,
				precipitationQtyUnit,
				snowDepth,
				pressure,
				visibility,
				visibilityUnit,
				windDirection,
			});
		}
	}, [data, daySelection]);

	if (Object.getOwnPropertyNames(data).length === 0) return <></>;

	return (
		<Suspense fallback={<Loading />}>
			<CurrentWeather
				data={data}
				selectedTime={selectedTime}
				forecastStartIndex={forecastStartIndex}
				weatherWarning={weatherWarning}
			/>
			<WeatherTimelineDaily data={data} daySelection={daySelection} handleDayChange={handleDayChange} />

			<WeatherTimelineHourly
				chartData={chartData}
				hourSelection={hourSelection}
				handleHourChange={handleHourChange}
				daySelection={daySelection}
				date={date}
			/>

			<WeatherGraphs chartData={chartData} data={data} />
		</Suspense>
	);
};

export default Weather;
