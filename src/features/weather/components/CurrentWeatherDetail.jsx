import { useState } from "react";

import { Box, IconButton, ClickAwayListener, Icon, Tooltip, Typography } from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { formatWeatherData } from "../../../utils/formatWeatherData";

const CurrentWeatherDetail = ({ header, value, unit, secondaryValue, type, tooltip }) => {
	const formattedInfo = formatWeatherData(value, unit, type);
	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<Box sx={{ height: 66, width: "100%" }}>
			<Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: 14 }} color="primary">
				{header}{" "}
				{tooltip && (
					<ClickAwayListener onClickAway={handleTooltipClose}>
						<span style={{ display: "inline-block", width: "5px" }}>
							<Tooltip
								PopperProps={{
									disablePortal: true,
									modifiers: [
										{
											name: "offset",
											options: {
												offset: [0, 25],
											},
										},
									],
									sx: {
										"& .MuiTooltip-tooltip": {
											padding: "5px",
											maxWidth: { xs: "89vw", sm: "91vw", lg: "fit-content" },
										},
									},
								}}
								onClose={handleTooltipClose}
								open={open}
								disableFocusListener
								disableHoverListener
								disableTouchListener
								title={tooltip}
								sx={{ p: 4 }}
							>
								<IconButton size="small" sx={{ p: 0 }} onClick={handleTooltipOpen}>
									<InfoOutlinedIcon sx={{ fontSize: 14 }} />
								</IconButton>
							</Tooltip>
						</span>
					</ClickAwayListener>
				)}
			</Typography>
			<Typography>
				{formattedInfo}{" "}
				{secondaryValue && header === "wind" && (
					<Icon
						component="i"
						sx={{ fontSize: 20, overflow: "visible", width: "min-content" }}
						baseClassName={`wi wi-wind towards-${secondaryValue}-deg`}
						aria-hidden={false}
						aria-label={`wind icon - towards ${secondaryValue} degrees`}
						role="img"
					></Icon>
				)}
			</Typography>
		</Box>
	);
};

export default CurrentWeatherDetail;
