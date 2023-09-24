import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
	return (
		<Paper sx={{ my: 3, p: 5, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
			<CircularProgress color="primary" />
		</Paper>
	);
};

export default Loading;
