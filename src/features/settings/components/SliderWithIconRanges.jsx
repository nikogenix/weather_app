import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

import { convertBetweenCandF } from "../../../utils/formatWeatherData";

const StyledSlider = styled(Slider)(({ theme }) => ({
	color: "currentColor",
	height: 40,
	padding: "13px 0",
	width: "80%",
	[theme.breakpoints.up("sm")]: {
		width: "90%",
	},
	display: "block",
	margin: "auto",
	"& .MuiSlider-thumb": {
		height: 0,
		width: 0,
		position: "absolute",
		top: 63,
		"&:hover": {
			"& .MuiSlider-valueLabel": { boxShadow: "0 0 5px 3px rgba(133,118,133,0.16)" },
			boxShadow: "none",
		},
		"&.Mui-active": {
			"& .MuiSlider-valueLabel": { boxShadow: "0 0 10px 8px rgba(133,118,133,0.16)" },

			boxShadow: "none",
		},
		"&.Mui-focusVisible": {
			"& .MuiSlider-valueLabel": { boxShadow: "0 0 10px 8px rgba(133,118,133,0.16)" },

			boxShadow: "none",
		},
		transition: "box-shadow 0.3s ease-in-out",
	},
	"& .MuiSlider-track": {
		height: 3,
		margin: 20,
	},
	"& .MuiSlider-rail": {
		color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
		opacity: theme.palette.mode === "dark" ? undefined : 1,
		height: 3,
		position: "absolute",
		top: 55,
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

function formatAriaLabel(value) {
	return `adjust slider point #${value}`;
}

const SliderWithIconRanges = ({ value, handleChange, icons, formatValue }) => {
	const minC = -25;
	const maxC = 40;
	const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);

	return (
		<Box sx={{ width: "100%" }}>
			<StyledSlider
				value={value}
				min={temperatureUnit === "C" ? minC : convertBetweenCandF(minC, "C")}
				max={temperatureUnit === "C" ? maxC : convertBetweenCandF(maxC, "C")}
				step={1}
				onChange={handleChange}
				track={false}
				valueLabelDisplay="on"
				getAriaValueText={formatValue}
				getAriaLabel={formatAriaLabel}
				valueLabelFormat={formatValue}
			/>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				{icons.map((c, i) => {
					return (
						<Box
							sx={{
								width: 85,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
							key={i}
						>
							{c}
							<Box
								sx={{
									display: "flex",
									flexDirection: { xs: "column", sm: "row" },
									alignItems: "center",
									justifyContent: "center",
									width: "100%",
									marginTop: 1,
								}}
							>
								<Box sx={{ textAlign: "center", width: "50%" }}>
									<Typography variant="button" fontSize={10}>
										min
									</Typography>
									<Typography>{(i === 0 && "...") || formatValue(value[i - 1])}</Typography>
								</Box>
								<Box sx={{ textAlign: "center", width: "50%" }}>
									<Typography variant="button" fontSize={10}>
										max
									</Typography>
									<Typography>
										{(i === icons.length - 1 && "...") || formatValue(value[i] - 1)}
									</Typography>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default SliderWithIconRanges;
