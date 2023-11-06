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
import { ReactComponent as Sneackers } from "../assets/icons/Sneackers.svg";
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
	Boots: {
		component: Boots,
		description: "boots",
	},
	LongSleeve: {
		component: LongSleeve,
		description: "long-sleeve shirt",
	},
	Sandals: {
		component: Sandals,
		description: "sandals",
	},
	UmbrellaRainCoat: {
		component: UmbrellaRainCoat,
		description: "umbrella and raincoat",
	},
	ClosedWindows: {
		component: ClosedWindows,
		description: "closed windows",
	},
	LoosePants: {
		component: LoosePants,
		description: "loose-fitting pants",
	},
	Shirt: {
		component: Shirt,
		description: "shirt",
	},
	Water: {
		component: Water,
		description: "water bottle",
	},
	Coat: {
		component: Coat,
		description: "coat",
	},
	Mask: {
		component: Mask,
		description: "mask",
	},
	Shorts: {
		component: Shorts,
		description: "shorts",
	},
	WinterBoots: {
		component: WinterBoots,
		description: "winter boots",
	},
	FallCoat: {
		component: FallCoat,
		description: "fall coat",
	},
	NoElectronics: {
		component: NoElectronics,
		description: "no electronics - overheating risk",
	},
	Snickers: {
		component: Sneackers,
		description: "sneakers",
	},
	WinterJacket: {
		component: WinterJacket,
		description: "winter jacket",
	},
	GlovesCapComforter: {
		component: GlovesCapComforter,
		description: "gloves, cap, and comforter",
	},
	OpenWindows: {
		component: OpenWindows,
		description: "open windows",
	},
	SunCover: {
		component: SunCover,
		description: "cover-up for sun protection",
	},
	WinterTrousers: {
		component: WinterTrousers,
		description: "winter trousers",
	},
	Hoodie: {
		component: Hoodie,
		description: "hoodie",
	},
	Pullover: {
		component: Pullover,
		description: "pullover",
	},
	SunHatUmbrella: {
		component: SunHatUmbrella,
		description: "sun hat and umbrella",
	},
	Jeans: {
		component: Jeans,
		description: "jeans",
	},
	PulloverX2: {
		component: PulloverX2,
		description: "pullover (2 layers)",
	},
	Sunglasses: {
		component: Sunglasses,
		description: "sunglasses",
	},
	JeansX2: {
		component: JeansX2,
		description: "jeans (2 layers)",
	},
	PulloverX3: {
		component: PulloverX3,
		description: "pullover (3 layers)",
	},
	Sunscreen: {
		component: Sunscreen,
		description: "sunscreen",
	},
};

const WeatherRecommendationIcon = ({ iconName, size, color }) => {
	const IconData = iconComponents[iconName];

	if (!IconData) return <>missing icon</>;

	return (
		<Tooltip title={IconData.description}>
			<SvgIcon viewBox="0 0 40 40" style={{ fontSize: size, color }}>
				<IconData.component style={{ fontSize: size }} />
			</SvgIcon>
		</Tooltip>
	);
};

export default WeatherRecommendationIcon;
