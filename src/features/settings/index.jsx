import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Modal } from "@mui/material";

import { formatWeatherData } from "../../utils/formatWeatherData";

import WeatherRecommendationIcon from "../../components/WeatherRecommendationIcon";
import SettingsTitleWithBorder from "./components/SettingsTitleWithBorder";
import SliderWithIconRanges from "./components/SliderWithIconRanges";
import CheckboxWithCustomLabel from "./components/CheckboxWithCustomLabel";
import NumberInputWithVariableWidth from "./components/NumberInputWithVariableWidth";

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
	const preferences = useSelector((state) => state.settings.preferences);
	const [newPreferences, setNewPreferences] = useState(preferences);

	useEffect(() => {
		setNewPreferences(preferences);
	}, [preferences]);

	const updateObjProp = (obj, value, propPath) => {
		const newObj = { ...obj };
		const [head, ...rest] = propPath.split(".");
		const nestedObj = newObj[head];

		return !rest.length
			? { ...newObj, [head]: value }
			: { ...newObj, [head]: updateObjProp(nestedObj, value, rest.join(".")) };
	}; // source: https://stackoverflow.com/a/50392139

	const handlePreferenceChange = (name, value) => {
		setNewPreferences((previousPreferences) => {
			return updateObjProp(previousPreferences, value, name);
		});
	};

	const [lowerClothingValues, setLowerClothingValues] = useState([-10, 0, 10, 20]);

	const [bootsValues, setBootsValues] = useState([0, 10, 20]);

	//const [upperClothingValues, setUpperClothingValues] = useState([-10, 0, 10, 20]);
	const upperClothingIcons = [
		<WeatherRecommendationIcon key="PulloverX3" iconName="PulloverX3" size={45} />,
		<WeatherRecommendationIcon key="PulloverX2" iconName="PulloverX2" size={45} />,
		<WeatherRecommendationIcon key="Pullover" iconName="Pullover" size={45} />,
		<WeatherRecommendationIcon key="LongSleeve" iconName="LongSleeve" size={45} />,
		<WeatherRecommendationIcon key="Shirt" iconName="Shirt" size={45} />,
	];

	//const [upperClothingLayerValues, setUpperClothingLayerValues] = useState([-10, 0, 10, 20]);
	const upperClothingLayerIcons = [
		<WeatherRecommendationIcon key="WinterJacket" iconName="WinterJacket" size={45} />,
		<WeatherRecommendationIcon key="Coat" iconName="Coat" size={45} />,
		<WeatherRecommendationIcon key="FallCoat" iconName="FallCoat" size={45} />,
		<WeatherRecommendationIcon key="Hoodie" iconName="Hoodie" size={45} />,
		<WeatherRecommendationIcon key="SunCover" iconName="SunCover" size={45} />,
	];

	//const [lowerClothingValues, setLowerClothingValues] = useState([-10, 0, 10, 20]);
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

	//const [bootsValues, setBootsValues] = useState([0, 10, 20]);
	const handleBootsChange = (event, newValue) => {
		setBootsValues(newValue);
	};
	const bootsIcons = [
		<WeatherRecommendationIcon key="WinterBoots" iconName="WinterBoots" size={45} />,
		<WeatherRecommendationIcon key="Boots" iconName="Boots" size={45} />,
		<WeatherRecommendationIcon key="Snickers" iconName="Snickers" size={45} />,
		<WeatherRecommendationIcon key="Sandals" iconName="Sandals" size={45} />,
	];

	if (!newPreferences) return null;

	return (
		<Modal open={open} onClose={handleClose} aria-labelledby="settings panel" aria-describedby="settings panel ">
			<Box sx={style}>
				<SettingsTitleWithBorder title="settings" border={3}>
					<SettingsTitleWithBorder title="upper clothing" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconRanges
								value={newPreferences.upperClothing.values}
								handleChange={(e) => handlePreferenceChange("upperClothing.values", e.target.value)}
								icons={upperClothingIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="upper clothing layer" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconRanges
								value={newPreferences.upperClothingLayer.values}
								handleChange={(e) =>
									handlePreferenceChange("upperClothingLayer.values", e.target.value)
								}
								icons={upperClothingLayerIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder title="weather conditions" border={1}>
							<CheckboxWithCustomLabel
								checked={newPreferences.upperClothingLayer.jacketIfSnow}
								handleChange={(e) =>
									handlePreferenceChange("upperClothingLayer.jacketIfSnow", e.target.checked)
								}
							>
								if snowing, suggest winter jacket regardless of temperature
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.upperClothingLayer.coverIfSunAndUvThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"upperClothingLayer.coverIfSunAndUvThreshold.enabled",
										e.target.checked
									)
								}
							>
								even if the UV index is below{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.upperClothingLayer.coverIfSunAndUvThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"upperClothingLayer.coverIfSunAndUvThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.upperClothingLayer.coverIfSunAndUvThreshold.enabled}
								/>
								, suggest at least a sun cover during day time
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="lower clothing" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconRanges
								value={lowerClothingValues}
								handleChange={handleLowerClothingChange}
								icons={lowerClothingIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder title="weather conditions" border={1}>
							<CheckboxWithCustomLabel
								checked={newPreferences.lowerClothing.rainNoShorts}
								handleChange={(e) =>
									handlePreferenceChange("lowerClothing.rainNoShorts", e.target.checked)
								}
							>
								if raining, don&apos;t suggest shorts regardless of temperature
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.lowerClothing.trousersIfSnow}
								handleChange={(e) =>
									handlePreferenceChange("lowerClothing.trousersIfSnow", e.target.checked)
								}
							>
								if snowing, suggest winter trousers regardless of temperature
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="shoes" border={2}>
						<SettingsTitleWithBorder title="temperature ranges" border={1}>
							<SliderWithIconRanges
								value={bootsValues}
								handleChange={handleBootsChange}
								icons={bootsIcons}
								formatValue={(value) => formatWeatherData(value, "", "degree")}
							/>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder title="weather conditions" border={1}>
							<CheckboxWithCustomLabel
								checked={newPreferences.boots.rainNoSandals}
								handleChange={(e) => handlePreferenceChange("boots.rainNoSandals", e.target.checked)}
							>
								if raining, don&apos;t suggest sandals regardless of temperature
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.boots.bootsIfSnow}
								handleChange={(e) => handlePreferenceChange("boots.bootsIfSnow", e.target.checked)}
							>
								if snowing, suggest winter boots regardless of temperature
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="accessories" border={2}>
						<SettingsTitleWithBorder
							title="umbrella / raincoat"
							border={1}
							icon={<WeatherRecommendationIcon iconName="UmbrellaRainCoat" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.accessories.umbrella.rain}
								handleChange={(e) =>
									handlePreferenceChange("accessories.umbrella.rain", e.target.checked)
								}
							>
								recommend if there is a chance of rain
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="sunglasses"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Sunglasses" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.accessories.sunglasses.ifUvThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"accessories.sunglasses.ifUvThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend if UV is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.accessories.sunglasses.ifUvThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"accessories.sunglasses.ifUvThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.accessories.sunglasses.ifUvThreshold.enabled}
								/>{" "}
								or higher
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="sun hat / umbrella"
							border={1}
							icon={<WeatherRecommendationIcon iconName="SunHatUmbrella" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.accessories.sunHat.ifUvThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange("accessories.sunHat.ifUvThreshold.enabled", e.target.checked)
								}
							>
								recommend if UV is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.accessories.sunHat.ifUvThreshold.value}
									onChange={(e) =>
										handlePreferenceChange("accessories.sunHat.ifUvThreshold.value", e.target.value)
									}
									disabled={!newPreferences.accessories.sunHat.ifUvThreshold.enabled}
								/>{" "}
								or higher
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="gloves / cap / comforter"
							border={1}
							icon={<WeatherRecommendationIcon iconName="GlovesCapComforter" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.accessories.gloves.ifTempThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"accessories.gloves.ifTempThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend if temperature is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.accessories.gloves.ifTempThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"accessories.gloves.ifTempThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.accessories.gloves.ifTempThreshold.enabled}
								/>
								° or less
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.accessories.gloves.ifSnow}
								handleChange={(e) =>
									handlePreferenceChange("accessories.gloves.ifSnow", e.target.checked)
								}
							>
								recommend if there is a chance of snow, regardless of temperature
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>

					<SettingsTitleWithBorder title="miscellaneous" border={2}>
						<SettingsTitleWithBorder
							title="SPF cream"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Sunscreen" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.spf.ifUvThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange("miscellaneous.spf.ifUvThreshold.enabled", e.target.checked)
								}
							>
								recommend if UV is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.spf.ifUvThreshold.value}
									onChange={(e) =>
										handlePreferenceChange("miscellaneous.spf.ifUvThreshold.value", e.target.value)
									}
									disabled={!newPreferences.miscellaneous.spf.ifUvThreshold.enabled}
								/>{" "}
								or higher
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="mask"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Mask" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.mask.ifAqiThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"miscellaneous.mask.ifAqiThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend if AQI is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.mask.ifAqiThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"miscellaneous.mask.ifAqiThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.miscellaneous.mask.ifAqiThreshold.enabled}
								/>{" "}
								or higher
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="water bottle"
							border={1}
							icon={<WeatherRecommendationIcon iconName="Water" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.water.ifTempThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"miscellaneous.water.ifTempThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend if temperature is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.water.ifTempThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"miscellaneous.water.ifTempThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.miscellaneous.water.ifTempThreshold.enabled}
								/>
								° or higher
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.water.always}
								handleChange={(e) =>
									handlePreferenceChange("miscellaneous.water.always", e.target.checked)
								}
							>
								{"recommend always (will override the temperature threshold)"}
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="electronics overheating risk"
							border={1}
							icon={<WeatherRecommendationIcon iconName="NoElectronics" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.electronicsOverheat.ifTempThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"miscellaneous.electronicsOverheat.ifTempThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend if temperature is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.electronicsOverheat.ifTempThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"miscellaneous.electronicsOverheat.ifTempThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.miscellaneous.electronicsOverheat.ifTempThreshold.enabled}
								/>
								° or higher
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
						<SettingsTitleWithBorder
							title="windows"
							border={1}
							icon={<WeatherRecommendationIcon iconName="OpenWindows" size={35} />}
						>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.windows.openIfTempThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"miscellaneous.windows.openIfTempThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend keeping windows open if temperature is between{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.windows.openIfTempThreshold.minValue}
									onChange={(e) =>
										handlePreferenceChange(
											"miscellaneous.windows.openIfTempThreshold.minValue",
											e.target.value
										)
									}
									disabled={!newPreferences.miscellaneous.windows.openIfTempThreshold.enabled}
								/>
								° and{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.windows.openIfTempThreshold.maxValue}
									onChange={(e) =>
										handlePreferenceChange(
											"miscellaneous.windows.openIfTempThreshold.maxValue",
											e.target.value
										)
									}
									disabled={!newPreferences.miscellaneous.windows.openIfTempThreshold.enabled}
								/>
								°
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.windows.openIfAqiThreshold.enabled}
								handleChange={(e) =>
									handlePreferenceChange(
										"miscellaneous.windows.openIfAqiThreshold.enabled",
										e.target.checked
									)
								}
							>
								recommend keeping windows open if AQI is{" "}
								<NumberInputWithVariableWidth
									value={newPreferences.miscellaneous.windows.openIfAqiThreshold.value}
									onChange={(e) =>
										handlePreferenceChange(
											"miscellaneous.windows.openIfAqiThreshold.value",
											e.target.value
										)
									}
									disabled={!newPreferences.miscellaneous.windows.openIfAqiThreshold.enabled}
								/>{" "}
								or lower
							</CheckboxWithCustomLabel>
							<CheckboxWithCustomLabel
								checked={newPreferences.miscellaneous.windows.closeIfRainOrSnow}
								handleChange={(e) =>
									handlePreferenceChange("miscellaneous.windows.closeIfRainOrSnow", e.target.checked)
								}
							>
								{
									"recommend keeping windows closed if raining/snowing (will override the temperature and AQI thresholds)"
								}
							</CheckboxWithCustomLabel>
						</SettingsTitleWithBorder>
					</SettingsTitleWithBorder>
				</SettingsTitleWithBorder>
			</Box>
		</Modal>
	);
};

export default Settings;
