import { useState } from "react";

import { Box, Checkbox, Modal, Typography } from "@mui/material";

import WeatherRecommendationIcon from "../../components/WeatherRecommendationIcon";
import SliderWithIconThumbs from "./components/SliderWithIconThumbs";

import { formatWeatherData } from "../../utils/formatWeatherData";
import SettingsTitleWithBorder from "./components/SettingsTitleWithBorder";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "100%",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 1,
	maxHeight: "80vh",
	overflow: "scroll",
	maxWidth: 800,
	margin: "auto",
};

const Settings = ({ open, handleClose }) => {
	const [upperClothingValues, setUpperClothingValues] = useState([-20, -10, 0, 10, 20]);
	const handleUpperClothingChange = (event, newValue) => {
		setUpperClothingValues(newValue);
	};
	const upperClothingIcons = [
		<WeatherRecommendationIcon key="PulloverX3" iconName="PulloverX3" size={45} />,
		<WeatherRecommendationIcon key="PulloverX2" iconName="PulloverX2" size={45} />,
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
		<Modal open={open} onClose={handleClose} aria-labelledby="settings panel" aria-describedby="settings panel ">
			<Box sx={style}>
				<SettingsTitleWithBorder title="settings" border={3}>
					<SettingsTitleWithBorder title="upper clothing" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconThumbs
								value={upperClothingValues}
								handleChange={handleUpperClothingChange}
								icons={upperClothingIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="upper clothing layer" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconThumbs
								value={upperClothingLayerValues}
								handleChange={handleUpperClothingLayerChange}
								icons={upperClothingLayerIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder title="weather conditions" border={1}>
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
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="lower clothing" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconThumbs
								value={lowerClothingValues}
								handleChange={handleLowerClothingChange}
								icons={lowerClothingIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder title="weather conditions" border={1}>
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
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="shoes" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconThumbs
								value={bootsValues}
								handleChange={handleBootsChange}
								icons={bootsIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder title="weather conditions" border={1}>
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
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="accessories" border={2}>
						<SettingsTitleWithBorder
							title="umbrella / raincoat"
							border={1}
							icon={<WeatherRecommendationIcon iconName="UmbrellaRainCoat" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if there is a chance of rain
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="sunglasses"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Sunglasses" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if UV is _ or higher
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="sun hat / umbrella"
							border={1}
							icon={<WeatherRecommendationIcon iconName="SunHatUmbrella" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if UV is _ or higher
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="gloves / cap / comforter"
							border={1}
							icon={<WeatherRecommendationIcon iconName="GlovesCapComforter" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if temperature is _ or less
								</Typography>
							</Box>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if there is a chance of snow, regardless of temperature
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="miscellaneous" border={2}>
						<SettingsTitleWithBorder
							title="SPF cream"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Sunscreen" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if UV is _ or higher
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="mask"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Mask" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if AQI is _ or higher
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="water bottle"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Water" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if temperature is _ or more
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="electronics overheating risk"
							border={1}
							icon={<WeatherRecommendationIcon iconName="NoElectronics" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend if temperature is _ or more
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="windows"
							border={1}
							icon={<WeatherRecommendationIcon iconName="OpenWindows" size={35} />}
						>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend keeping windows open if temperature is between _ and _
								</Typography>
							</Box>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend keeping windows open if AQI is between _ and _
								</Typography>
							</Box>
							<Box>
								<Checkbox defaultChecked />
								<Typography variant="p" component="span">
									recommend keeping windows closed if raining/snowing
								</Typography>
							</Box>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>
				</SettingsTitleWithBorder>
			</Box>
		</Modal>
	);
};

export default Settings;
