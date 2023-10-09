import { SvgIcon, Tooltip } from "@mui/material";

import { ReactComponent as Boots } from "../assets/icons/Boots.svg";
import { ReactComponent as LongSleeve } from "../assets/icons/LongSleeve.svg";
import { ReactComponent as Sandals } from "../assets/icons/Sandals.svg";
import { ReactComponent as UmbrellaRainCoat } from "../assets/icons/UmbrellaRainCoat.svg";
import { ReactComponent as ClosedWindows } from "../assets/icons/ClosedWindows.svg";
import { ReactComponent as LoosePants } from "../assets/icons/LoosePants.svg";
import { ReactComponent as Shirt } from "../assets/icons/Shirt.svg";
import { ReactComponent as Water } from "../assets/icons/Water.svg";
import { ReactComponent as Coat } from "../assets/icons/Coat.svg";
import { ReactComponent as Mask } from "../assets/icons/Mask.svg";
import { ReactComponent as Shorts } from "../assets/icons/Shorts.svg";
import { ReactComponent as WinterBoots } from "../assets/icons/WinterBoots.svg";
import { ReactComponent as FallCoat } from "../assets/icons/FallCoat.svg";
import { ReactComponent as NoElectronics } from "../assets/icons/NoElectronics.svg";
import { ReactComponent as Snickers } from "../assets/icons/Snickers.svg";
import { ReactComponent as WinterJacket } from "../assets/icons/WinterJacket.svg";
import { ReactComponent as GlovesCapComforter } from "../assets/icons/GlovesCapComforter.svg";
import { ReactComponent as OpenWindows } from "../assets/icons/OpenWindows.svg";
import { ReactComponent as SunCover } from "../assets/icons/SunCover.svg";
import { ReactComponent as WinterTrousers } from "../assets/icons/WinterTrousers.svg";
import { ReactComponent as Hoodie } from "../assets/icons/Hoodie.svg";
import { ReactComponent as Pullover } from "../assets/icons/Pullover.svg";
import { ReactComponent as SunHatUmbrella } from "../assets/icons/SunHatUmbrella.svg";
import { ReactComponent as Jeans } from "../assets/icons/Jeans.svg";
import { ReactComponent as PulloverX2 } from "../assets/icons/PulloverX2.svg";
import { ReactComponent as Sunglasses } from "../assets/icons/Sunglasses.svg";
import { ReactComponent as JeansX2 } from "../assets/icons/JeansX2.svg";
import { ReactComponent as PulloverX3 } from "../assets/icons/PulloverX3.svg";
import { ReactComponent as Sunscreen } from "../assets/icons/Sunscreen.svg";

const iconComponents = {
	Boots,
	LongSleeve,
	Sandals,
	UmbrellaRainCoat,
	ClosedWindows,
	LoosePants,
	Shirt,
	Water,
	Coat,
	Mask,
	Shorts,
	WinterBoots,
	FallCoat,
	NoElectronics,
	Snickers,
	WinterJacket,
	GlovesCapComforter,
	OpenWindows,
	SunCover,
	WinterTrousers,
	Hoodie,
	Pullover,
	SunHatUmbrella,
	Jeans,
	PulloverX2,
	Sunglasses,
	JeansX2,
	PulloverX3,
	Sunscreen,
};

const WeatherRecommendationIcon = ({ iconName, size, color }) => {
	const IconComponent = iconComponents[iconName];

	if (!IconComponent) return <>missing icon</>;

	return (
		<Tooltip title="">
			{/* TODO: aria labels & tooltip */}
			<SvgIcon viewBox="0 0 40 40" style={{ fontSize: size, color }}>
				<IconComponent style={{ fontSize: size }} />
			</SvgIcon>
		</Tooltip>
	);
};

export default WeatherRecommendationIcon;
