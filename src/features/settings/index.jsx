import { useState } from "react";

import { Box, Checkbox, Divider, Modal, Typography } from "@mui/material";

import WeatherRecommendationIcon from "../../components/WeatherRecommendationIcon";
import SliderWithIconThumbs from "./components/SliderWithIconThumbs";

import { formatWeatherData } from "../../utils/formatWeatherData";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	maxHeight: "80vh",
	overflow: "scroll",
};

const Settings = ({ open, handleClose }) => {
	const [upperClothingValues, setUpperClothingValues] = useState([-20, -10, 0, 10, 20]);
	const handleUpperClothingChange = (event, newValue) => {
		setUpperClothingValues(newValue);
	};
	const upperClothingIcons = [
		<WeatherRecommendationIcon key="PulloverX3" iconName="PulloverX2" size={45} />,
		<WeatherRecommendationIcon key="PulloverX2" iconName="PulloverX3" size={45} />,
		<WeatherRecommendationIcon key="Pullover" iconName="Pullover" size={45} />,
		<WeatherRecommendationIcon key="LongSleeve" iconName="LongSleeve" size={45} />,
		<WeatherRecommendationIcon key="Shirt" iconName="Shirt" size={45} />,
	];

	const [upperClothingLayerValues, setUpperClothingLayerValues] = useState([-20, -10, 0, 10, 20]);
	const handleUpperClothingLayerChange = (event, newValue) => {
		setUpperClothingLayerValues(newValue);
	};
	const upperClothingLayerIcons = [
		<WeatherRecommendationIcon key="WinterJacket" iconName="WinterJacket" size={45} />,
		<WeatherRecommendationIcon key="Coat" iconName="Coat" size={45} />,
		<WeatherRecommendationIcon key="FallCoat" iconName="FallCoat" size={45} />,
		<WeatherRecommendationIcon key="Hoodie" iconName="Hoodie" size={45} />,
		<WeatherRecommendationIcon key="SunCover" iconName="SunCover" size={45} />,
	];

	const [lowerClothingValues, setLowerClothingValues] = useState([-20, -10, 0, 10, 20]);
	const handleLowerClothingChange = (event, newValue) => {
		setLowerClothingValues(newValue);
	};
	const lowerClothingIcons = [
		<WeatherRecommendationIcon key="WinterTrousers" iconName="WinterTrousers" size={45} />,
		<WeatherRecommendationIcon key="JeansX2" iconName="JeansX2" size={45} />,
		<WeatherRecommendationIcon key="Jeans" iconName="Jeans" size={45} />,
		<WeatherRecommendationIcon key="LoosePants" iconName="LoosePants" size={45} />,
		<WeatherRecommendationIcon key="Shorts" iconName="Shorts" size={45} />,
	];

	const [bootsValues, setBootsValues] = useState([-10, 0, 10, 20]);
	const handleBootsChange = (event, newValue) => {
		setBootsValues(newValue);
	};
	const bootsIcons = [
		<WeatherRecommendationIcon key="WinterBoots" iconName="WinterBoots" size={45} />,
		<WeatherRecommendationIcon key="Boots" iconName="Boots" size={45} />,
		<WeatherRecommendationIcon key="Snickers" iconName="Snickers" size={45} />,
		<WeatherRecommendationIcon key="Sandals" iconName="Sandals" size={45} />,
	];

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="settings panel"
			aria-describedby="settings panel "
			sx={{ overflow: "scroll" }}
		>
			<Box sx={style}>
				<Typography variant="h6" component="h2">
					settings
				</Typography>

				<Divider textAlign="left" sx={{ my: 1 }}>
					<Typography variant="h6" component="span">
						upper clothing
					</Typography>
				</Divider>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						temperature ranges
					</Typography>
				</Divider>
				<SliderWithIconThumbs
					value={upperClothingValues}
					handleChange={handleUpperClothingChange}
					icons={upperClothingIcons}
					formatValue={(value) => formatWeatherData(value, "", "degree")}
				/>

				<Divider textAlign="left" sx={{ my: 1 }}>
					<Typography variant="h6" component="span">
						upper clothing layer
					</Typography>
				</Divider>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						temperature ranges
					</Typography>
				</Divider>
				<SliderWithIconThumbs
					value={upperClothingLayerValues}
					handleChange={handleUpperClothingLayerChange}
					icons={upperClothingLayerIcons}
					formatValue={(value) => formatWeatherData(value, "", "degree")}
				/>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						weather conditions
					</Typography>
				</Divider>
				<Box>
					<Checkbox defaultChecked />
					<Typography variant="p" component="span">
						if snowing, suggest winter jacket regardless of temperature
					</Typography>
				</Box>
				<Box>
					<Checkbox defaultChecked />
					<Typography variant="p" component="span">
						even if the UV index is below 3, suggest at least a sun cover during day time
					</Typography>
				</Box>

				<Divider textAlign="left" sx={{ my: 1 }}>
					<Typography variant="h6" component="span">
						lower clothing
					</Typography>
				</Divider>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						temperature ranges
					</Typography>
				</Divider>
				<SliderWithIconThumbs
					value={lowerClothingValues}
					handleChange={handleLowerClothingChange}
					icons={lowerClothingIcons}
					formatValue={(value) => formatWeatherData(value, "", "degree")}
				/>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						weather conditions
					</Typography>
				</Divider>
				<Box>
					<Checkbox defaultChecked />
					<Typography variant="p" component="span">
						if raining, don&apos;t suggest shorts regardless of temperature
					</Typography>
				</Box>
				<Box>
					<Checkbox defaultChecked />
					<Typography variant="p" component="span">
						if snowing, suggest winter trousers regardless of temperature
					</Typography>
				</Box>

				<Divider textAlign="left" sx={{ my: 1 }}>
					<Typography variant="h6" component="span">
						shoes
					</Typography>
				</Divider>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						temperature ranges
					</Typography>
				</Divider>
				<SliderWithIconThumbs
					value={bootsValues}
					handleChange={handleBootsChange}
					icons={bootsIcons}
					formatValue={(value) => formatWeatherData(value, "", "degree")}
				/>
				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						weather conditions
					</Typography>
				</Divider>
				<Box>
					<Checkbox defaultChecked />
					<Typography variant="p" component="span">
						if raining, don&apos;t suggest sandals regardless of temperature
					</Typography>
				</Box>
				<Box>
					<Checkbox defaultChecked />
					<Typography variant="p" component="span">
						if snowing, suggest winter boots regardless of temperature
					</Typography>
				</Box>

				<Divider textAlign="left" sx={{ my: 1 }}>
					<Typography variant="h6" component="span">
						accessories and recommendations
					</Typography>
				</Divider>

				<Divider textAlign="middle" sx={{ my: 1 }}>
					<Typography variant="p" component="span">
						rain
					</Typography>
				</Divider>

				<Box>
					<Checkbox defaultChecked />
					<WeatherRecommendationIcon key="UmbrellaRainCoat" iconName="UmbrellaRainCoat" size={45} />
				</Box>
			</Box>
		</Modal>
	);
};

export default Settings;
