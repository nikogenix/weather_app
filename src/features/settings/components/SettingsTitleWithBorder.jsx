import { Box, Typography, useTheme } from "@mui/material";

const SettingsTitleWithBorder = ({ title, border, children, icon }) => {
	const theme = useTheme();
	return (
		<>
			<Box
				sx={{
					borderBottom: `${border}px ${theme.palette.primary.main} solid`,
					width: "max-content",
					py: 0.5,
					px: 2,
					display: "flex",
					justifyItems: "center",
					alignItems: "center",
				}}
			>
				{icon && icon}
				<Typography variant="button" component="h2" sx={{ textTransform: "none", ml: icon ? 2 : 0 }}>
					{title}
				</Typography>
			</Box>
			<Box sx={{ borderLeft: `3px ${theme.palette.divider} solid`, pl: 1.2, py: 1, mb: 1.5 }}>{children}</Box>
		</>
	);
};

export default SettingsTitleWithBorder;
