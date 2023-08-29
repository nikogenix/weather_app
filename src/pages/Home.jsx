import { Box } from "@mui/material";
import WeatherPanel from "../features/weather/WeatherPanel";

const Home = () => {
	return (
		<>
			<WeatherPanel></WeatherPanel>
			<Box sx={{ my: 2 }}>
				{[...new Array(24)]
					.map(
						() => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
					)
					.join("\n")}
			</Box>
		</>
	);
};

export default Home;
