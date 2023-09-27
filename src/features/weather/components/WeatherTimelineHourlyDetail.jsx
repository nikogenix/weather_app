import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const WeatherTimelineHourlyDetail = ({ name, icon, value, isMobile }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: isMobile ? "column" : "row",
				borderLeft: isMobile ? "1px solid" : "none",
				mb: isMobile ? 1 : 0,
				pl: 0.5,
			}}
		>
			<Typography
				sx={{
					display: isMobile ? "inline" : "none",
					textTransform: "none",
					fontSize: 10,
					textAlign: "left",
				}}
			>
				{name}
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
				{!isMobile && (
					<Tooltip placement="left" title={name} arrow>
						{icon}
					</Tooltip>
				)}
				{isMobile && icon}
				<Typography sx={{ textTransform: "none" }} fontSize={12}>
					{value}
				</Typography>
			</Box>
		</Box>
	);
};

export default WeatherTimelineHourlyDetail;
