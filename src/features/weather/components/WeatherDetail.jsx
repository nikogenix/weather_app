import { Box, Typography } from "@mui/material";

const WeatherDetail = ({ header, subheader }) => {
	return (
		<Box sx={{ height: 66, width: "100%" }}>
			<Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: 14 }} color="primary">
				{header}
			</Typography>
			<Typography>{subheader}</Typography>
		</Box>
	);
};

export default WeatherDetail;
