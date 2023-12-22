import { Box, Tooltip } from "@mui/material";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";

const BoxWithTooltip = ({ content, tooltipEnabled, tooltipMessage = "incomplete forecast data", disabled, sx }) => {
	if (!content) return <Box sx={{ mx: 0.5, ...sx }}></Box>;
	if (disabled) return;
	if (tooltipEnabled)
		return (
			<Box sx={{ position: "relative", mx: 0.5, ...sx }}>
				<Box>{content}</Box>
				<Tooltip
					title={tooltipMessage}
					placement="top"
					sx={{
						position: "absolute",
						top: -15,
						right: -2.5,
						filter: "invert(68%) sepia(81%) saturate(4119%) hue-rotate(3deg) brightness(104%) contrast(106%)",
						// filter source: https://codepen.io/themau5/pen/QWwaYKR
					}}
				>
					<ErrorTwoToneIcon />
				</Tooltip>
			</Box>
		);
	return <Box sx={{ mx: 0.5, ...sx }}>{content}</Box>;
};

export default BoxWithTooltip;
