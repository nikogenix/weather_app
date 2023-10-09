import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";

const StyledSlider = styled(Slider)(({ theme }) => ({
	color: "currentColor",
	height: 100,
	padding: "13px 0",
	"& .MuiSlider-thumb": {
		height: 55,
		width: 55,
		backgroundColor: theme.palette.background.paper,
		position: "absolute",
		top: 98,
		transition: "box-shadow 0.3s ease-in-out",
		"&:hover": {
			boxShadow: "0 0 5px 3px rgba(133,118,133,0.16)",
		},
		"&.Mui-active": {
			boxShadow: "0 0 10px 8px rgba(133,118,133,0.16)",
		},
		"&.Mui-focusVisible": {
			boxShadow: "0 0 10px 8px rgba(133,118,133,0.16)",
		},
	},
	"& .MuiSlider-track": {
		height: 3,
	},
	"& .MuiSlider-rail": {
		color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
		opacity: theme.palette.mode === "dark" ? undefined : 1,
		height: 3,
	},
	"& .MuiSlider-valueLabel": {
		lineHeight: 1.2,
		fontSize: 15,
		padding: 0,
		width: 32,
		height: 32,
		borderRadius: "50% 50% 50% 0",
		backgroundColor: theme.palette.primary.dark,
		transformOrigin: "bottom left",
		"&:before": { display: "none" },
		"&.MuiSlider-valueLabelOpen": {
			transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
		},
		"& > *": {
			transform: "rotate(45deg)",
		},
	},
}));

function ThumbComponent(props) {
	const { children, icons, ...other } = props;
	return (
		<SliderThumb {...other}>
			{children}
			{icons[other["data-index"]]}
		</SliderThumb>
	);
}

function formatAriaLabel(value) {
	return `adjust slider point #${value}`;
}

const SliderWithIconThumbs = ({ value, handleChange, icons, formatValue }) => {
	return (
		<Box sx={{ width: "100%" }}>
			<StyledSlider
				value={value}
				min={-25}
				max={40}
				step={1}
				onChange={handleChange}
				track={false}
				slots={{ thumb: ThumbComponent }}
				slotProps={{ thumb: { icons } }}
				valueLabelDisplay="on"
				getAriaValueText={formatValue}
				getAriaLabel={formatAriaLabel}
				valueLabelFormat={formatValue}
			/>
		</Box>
	);
};

export default SliderWithIconThumbs;
