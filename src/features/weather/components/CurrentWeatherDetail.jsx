import { Box, Typography } from "@mui/material";

import { formatWeatherData } from "../../../utils/formatWeatherData";

const CurrentWeatherDetail = ({ header, value, unit, type }) => {
	const formattedInfo = formatWeatherData(value, unit, type);

	return (
		<Box sx={{ height: 66, width: "100%" }}>
			<Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: 14 }} color="primary">
				{header}
			</Typography>
			<Typography>{formattedInfo}</Typography>
		</Box>
	);
};

export default CurrentWeatherDetail;
