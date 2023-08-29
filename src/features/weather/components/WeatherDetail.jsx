import { Box, Typography } from "@mui/material";

const WeatherDetail = ({ header, subheader, layout }) => {
	return (
		<Box>
			<Typography color="primary">{header}</Typography>
			<Typography>{subheader}</Typography>
		</Box>
	);
};

export default WeatherDetail;
