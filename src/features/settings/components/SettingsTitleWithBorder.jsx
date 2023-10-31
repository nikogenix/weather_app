import { Box, Typography, useTheme } from "@mui/material";

const SettingsTitleWithBorder = ({ title, border, children, icon }) => {
	const theme = useTheme();
	return (
		<>
			<Typography
				variant="button"
				component="h2"
				sx={{
					borderBottom: `${border}px ${theme.palette.primary.main} solid`,
					width: "max-content",
					textTransform: "none",
					py: 0.5,
					px: 2,
					display: "inline-block",
				}}
			>
				{title}
			</Typography>
			{icon && icon}
			<Box sx={{ borderLeft: `3px ${theme.palette.divider} solid`, px: 2, py: 1 }}>{children}</Box>
		</>
	);
};

export default SettingsTitleWithBorder;
