import WeatherRecommendationIcon from "../components/WeatherRecommendationIcon";

export default function getWeatherIconSet(name, size) {
	if (name === "upperClothing")
		return [
			<WeatherRecommendationIcon key="PulloverX3" iconName="PulloverX3" size={size} />,
			<WeatherRecommendationIcon key="PulloverX2" iconName="PulloverX2" size={size} />,
			<WeatherRecommendationIcon key="Pullover" iconName="Pullover" size={size} />,
			<WeatherRecommendationIcon key="LongSleeve" iconName="LongSleeve" size={size} />,
			<WeatherRecommendationIcon key="Shirt" iconName="Shirt" size={size} />,
		];

	if (name === "upperClothingLayer")
		return [
			<WeatherRecommendationIcon key="WinterJacket" iconName="WinterJacket" size={size} />,
			<WeatherRecommendationIcon key="Coat" iconName="Coat" size={size} />,
			<WeatherRecommendationIcon key="FallCoat" iconName="FallCoat" size={size} />,
			<WeatherRecommendationIcon key="Hoodie" iconName="Hoodie" size={size} />,
			<WeatherRecommendationIcon key="SunCover" iconName="SunCover" size={size} />,
		];

	if (name === "lowerClothing")
		return [
			<WeatherRecommendationIcon key="WinterTrousers" iconName="WinterTrousers" size={size} />,
			<WeatherRecommendationIcon key="JeansX2" iconName="JeansX2" size={size} />,
			<WeatherRecommendationIcon key="Jeans" iconName="Jeans" size={size} />,
			<WeatherRecommendationIcon key="LoosePants" iconName="LoosePants" size={size} />,
			<WeatherRecommendationIcon key="Shorts" iconName="Shorts" size={size} />,
		];

	if (name === "boots")
		return [
			<WeatherRecommendationIcon key="WinterBoots" iconName="WinterBoots" size={size} />,
			<WeatherRecommendationIcon key="Boots" iconName="Boots" size={size} />,
			<WeatherRecommendationIcon key="Snickers" iconName="Snickers" size={size} />,
			<WeatherRecommendationIcon key="Sandals" iconName="Sandals" size={size} />,
		];

	if (name === "accessories")
		return {
			umbrellaRainCoat: (
				<WeatherRecommendationIcon key="UmbrellaRainCoat" iconName="UmbrellaRainCoat" size={size} />
			),
			sunglasses: <WeatherRecommendationIcon key="Sunglasses" iconName="Sunglasses" size={size} />,
			sunHatUmbrella: <WeatherRecommendationIcon key="SunHatUmbrella" iconName="SunHatUmbrella" size={size} />,
			glovesCapComforter: (
				<WeatherRecommendationIcon key="GlovesCapComforter" iconName="GlovesCapComforter" size={size} />
			),
		};

	if (name === "miscellaneous")
		return {
			sunscreen: <WeatherRecommendationIcon key="Sunscreen" iconName="Sunscreen" size={size} />,
			mask: <WeatherRecommendationIcon key="Mask" iconName="Mask" size={size} />,
			water: <WeatherRecommendationIcon key="Water" iconName="Water" size={size} />,
			noElectronics: <WeatherRecommendationIcon key="NoElectronics" iconName="NoElectronics" size={size} />,
			windows: {
				closed: <WeatherRecommendationIcon key="ClosedWindows" iconName="ClosedWindows" size={size} />,
				open: <WeatherRecommendationIcon key="OpenWindows" iconName="OpenWindows" size={size} />,
			},
		};
}
