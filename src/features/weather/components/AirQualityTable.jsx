import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const AirQualityTable = ({ value }) => {
	const rows = [
		{
			category: "Good",
			range: "(0-20)",
			general: "The air quality is good. Enjoy your usual outdoor activities.",
			sensitive: "The air quality is good. Enjoy your usual outdoor activities.",
			color: "rgba(0, 191, 255, 0.5)",
			rangeValues: [0, 20],
		},
		{
			category: "Fair",
			range: "(20-40)",
			general: "Enjoy your usual outdoor activities.",
			sensitive: "Enjoy your usual outdoor activities.",
			color: "rgba(0, 128, 0, 0.5)",
			rangeValues: [20, 40],
		},
		{
			category: "Moderate",
			range: "(40-60)",
			general: "Enjoy your usual outdoor activities.",
			sensitive: "Consider reducing intense outdoor activities, if you experience symptoms.",
			color: "rgba(255, 255, 0, 0.5)",
			rangeValues: [40, 60],
		},
		{
			category: "Poor",
			range: "(60-80)",
			general:
				"Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.",
			sensitive:
				"Consider reducing physical activities, particularly outdoors, especially if you experience symptoms.",
			color: "rgba(255, 165, 0, 0.5)",
			rangeValues: [60, 80],
		},
		{
			category: "Very poor",
			range: "(80-100)",
			general:
				"Consider reducing intense activities outdoors, if you experience symptoms such as sore eyes, a cough or sore throat.",
			sensitive: "Reduce physical activities, particularly outdoors, especially if you experience symptoms.",
			color: "rgba(255, 0, 0, 0.5)",
			rangeValues: [80, 100],
		},
		{
			category: "Extremely poor",
			range: "(>100)",
			general: "Reduce physical activities outdoors.",
			sensitive: "Avoid physical activities outdoors.",
			color: "rgba(128, 0, 128, 0.5)",
			rangeValues: [101, Infinity],
		},
	];

	const getBorderColor = (range, color) => {
		if (value >= range[0] && value <= range[1]) {
			const solidColor = color.replace(/[^,]+(?=\))/, "1");
			return `4px solid ${solidColor}}`;
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="Air Quality Table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ textAlign: "center" }}>European Air Quality Index</TableCell>
						<TableCell sx={{ textAlign: "center" }}>General population</TableCell>
						<TableCell sx={{ textAlign: "center" }}>Sensitive populations</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.category} sx={{ border: getBorderColor(row.rangeValues, row.color) }}>
							<TableCell
								component="th"
								scope="row"
								sx={{ backgroundColor: row.color, textAlign: "center", p: 1, width: 125 }}
							>
								<Typography variant="body2">{row.category}</Typography>
								<Typography variant="caption">{row.range}</Typography>
							</TableCell>
							<TableCell sx={{ fontSize: 11, textAlign: "center", p: 1, width: 180 }}>
								{row.general}
							</TableCell>
							<TableCell sx={{ fontSize: 11, textAlign: "center", p: 1, width: 180 }}>
								{row.sensitive}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default AirQualityTable;
