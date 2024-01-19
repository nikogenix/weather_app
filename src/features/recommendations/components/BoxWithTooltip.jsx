import { Box, Tooltip } from "@mui/material";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";

const BoxWithTooltip = ({
	content,
	tooltipEnabled,
	tooltipMessage = "incomplete forecast data",
	disabled,
	sx,
	hideIfNoContent,
}) => {
	if (!content) return <Box sx={{ mx: 0.5, ...sx, display: hideIfNoContent && "none" }}></Box>;
	if (disabled) return;
	if (tooltipEnabled)
		return (
			<Box sx={{ position: "relative", mx: 0.5, ...sx }}>
				<Box>{content}</Box>
				<Tooltip
					title={tooltipMessage}
					placement="right"
					sx={{
						position: "absolute",
						top: -15,
						right: -10,
						filter: "invert(68%) sepia(81%) saturate(4119%) hue-rotate(3deg) brightness(104%) contrast(106%)",
						// filter source: https://codepen.io/themau5/pen/QWwaYKR
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -10],
								},
							},
						],
					}}
				>
					<ErrorTwoToneIcon />
				</Tooltip>
			</Box>
		);
	return <Box sx={{ mx: 0.5, ...sx }}>{content}</Box>;
};

export default BoxWithTooltip;
