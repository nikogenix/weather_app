import { Box, Icon, Typography } from "@mui/material";

import { formatWeatherData } from "../../../utils/formatWeatherData";

const CurrentWeatherDetail = ({ header, value, unit, secondaryValue, type }) => {
	const formattedInfo = formatWeatherData(value, unit, type);

	return (
		<Box sx={{ height: 66, width: "100%" }}>
			<Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: 14 }} color="primary">
				{header}
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
