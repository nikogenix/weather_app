import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const UvIndexTable = ({ value }) => {
	const rows = [
		{
			category: "Low",
			range: "(0 - 2)",
			precautions:
				"Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 15+ sunscreen. Bright surfaces, sand, water, and snow will increase UV exposure.",
			color: "rgba(0, 128, 0, 0.5)",
			rangeValues: [0, 2],
		},
		{
			category: "Moderate",
			range: "(3 - 5)",
			precautions:
				"Stay in shade near midday when the sun is strongest. If outdoors, wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
			color: "rgba(255, 255, 0, 0.5)",
			rangeValues: [3, 5],
		},
		{
			category: "High",
			range: "(6 - 7)",
			precautions:
				"Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
			color: "rgba(255, 165, 0, 0.5)",
			rangeValues: [6, 7],
		},
		{
			category: "Very High",
			range: "(8 - 10)",
			precautions:
				"Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
			color: "rgba(255, 0, 0, 0.5)",
			rangeValues: [8, 10],
		},
		{
			category: "Extreme",
			range: "(11+)",
			precautions:
				"Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
			color: "rgba(128, 0, 128, 0.5)",
			rangeValues: [11, Infinity],
		},
	];

	const getBorderColor = (range, color) => {
		if (value >= range[0] && value <= range[1]) {
			const solidColor = color.replace(/[^,]+(?=\))/, "1");
			return `4px solid ${solidColor}`;
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="UV Index Table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ textAlign: "center" }}>UV Index Risk</TableCell>
						<TableCell sx={{ textAlign: "center" }}>Recommended Precautions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.category} sx={{ border: getBorderColor(row.rangeValues, row.color) }}>
							<TableCell
								component="th"
								scope="row"
								sx={{ backgroundColor: row.color, textAlign: "center", p: 1, width: 130 }}
							>
								<Typography variant="body2">{row.category}</Typography>
								<Typography variant="caption">{row.range}</Typography>
							</TableCell>
							<TableCell sx={{ fontSize: 11, textAlign: "center", p: 1, maxWidth: 200 }}>
								<Typography variant="caption">{row.precautions}</Typography>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UvIndexTable;
