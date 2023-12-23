import { Card } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
	return (
		<Card
			sx={{
				my: 3,
				p: 5,
				height: "75vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, rgba(106,85,145,0.15) 0%, rgba(255,255,255,0) 40% 100%)",
			}}
		>
			<CircularProgress color="primary" />
		</Card>
	);
};

export default Loading;
