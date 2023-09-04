import { useSelector } from "react-redux";
import CurrentWeather from "./components/CurrentWeather";
import WeatherGraphs from "./components/WeatherGraphs";

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

	const forecastStartIndex = Number(selectedTime.slice(0, 2));

	const weatherWarning = false;

	if (Object.getOwnPropertyNames(data).length === 0) return <></>;

	return (
		<>
			<CurrentWeather
				data={data}
				date={date}
				dateChange={dateChange}
				selectedTime={selectedTime}
				forecastStartIndex={forecastStartIndex}
				weatherWarning={weatherWarning}
			/>
			<WeatherGraphs
				data={data}
				date={date}
				dateChange={dateChange}
				selectedTime={selectedTime}
				forecastStartIndex={forecastStartIndex}
				weatherWarning={weatherWarning}
			/>
		</>
	);
};

export default Weather;
