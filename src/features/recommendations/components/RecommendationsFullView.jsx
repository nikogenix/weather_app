import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

const RecommendationsFullView = ({ recommendations, alignment }) => {
	const [minMaxAvgClothing, setMinMaxAvgClothing] = useState("avg");
	const handleClothingToggle = (event, newValue) => {
		if (newValue !== null) setMinMaxAvgClothing(newValue);
	};

	return (
		<Box>
			<Box sx={{ display: "flex", marginBottom: 2, justifyContent: alignment }}>
				<Typography
					variant="subtitle2"
					sx={{
						paddingRight: 1,
						paddingTop: 0.4,
						borderBottom: "3px solid gray",
						borderBottomColor: "primary.dark",
					}}
				>
					clothing
				</Typography>
				<ToggleButtonGroup
					exclusive
					value={minMaxAvgClothing}
					onChange={handleClothingToggle}
					sx={{ display: "flex" }}
				>
					<ToggleButton
						value="min"
						sx={{
							color: "info.light",
							"&.Mui-selected": { color: "info.dark", borderBottomWidth: "1px" },
							padding: 0.3,
							fontSize: 11,
							borderBottom: "3px solid gray",
							borderBottomColor: "primary.dark",
							borderRadius: 0,
						}}
					>
						min
					</ToggleButton>

					<ToggleButton
						value="avg"
						sx={{
							color: "success.light",
							"&.Mui-selected": { color: "success.dark", borderBottomWidth: "1px" },
							padding: 0.3,
							fontSize: 11,
							borderBottom: "3px solid gray",
							borderBottomColor: "primary.dark",
							borderRadius: 0,
						}}
					>
						avg
					</ToggleButton>

					<ToggleButton
						value="max"
						sx={{
							color: "warning.light",
							"&.Mui-selected": { color: "warning.dark", borderBottomWidth: "1px" },
							padding: 0.3,
							fontSize: 11,
							borderBottom: "3px solid gray",
							borderBottomColor: "primary.dark",
							borderRadius: 0,
						}}
					>
						max
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<Box sx={{ display: "flex", justifyContent: alignment }}>
				<Box
					sx={{
						position: "relative",
						top: 15,
						left: 5,
						minWidth: recommendations.clothing.upperClothing[minMaxAvgClothing].props.size,
					}}
				>
					{recommendations.clothing.upperClothingLayer[minMaxAvgClothing]}
				</Box>
				<Box>{recommendations.clothing.upperClothing[minMaxAvgClothing]}</Box>
				<Box>{recommendations.clothing.lowerClothing[minMaxAvgClothing]}</Box>
				<Box sx={{ position: "relative", top: 15, left: -10 }}>
					{recommendations.clothing.boots[minMaxAvgClothing]}
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: alignment }}>
				<Typography
					variant="subtitle2"
					sx={{
						paddingRight: 1,
						paddingTop: 0.4,
						borderBottom: "3px solid gray",
						borderBottomColor: "primary.dark",
						width: "fit-content",
						marginY: 2,
					}}
				>
					accessories
				</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: alignment }}>
				<Box>{recommendations.accessories.glovesCapComforter.icon}</Box>
				<Box>{recommendations.accessories.sunHatUmbrella.icon}</Box>
				<Box>{recommendations.accessories.sunglasses.icon}</Box>
				<Box>{recommendations.accessories.umbrellaRainCoat.icon}</Box>
			</Box>
			<Box sx={{ display: "flex", justifyContent: alignment }}>
				<Typography
					variant="subtitle2"
					sx={{
						paddingRight: 1,
						paddingTop: 0.4,
						borderBottom: "3px solid gray",
						borderBottomColor: "primary.dark",
						width: "fit-content",
						marginY: 2,
					}}
				>
					miscellaneous
				</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: alignment }}>
				<Box>{recommendations.miscellaneous.sunscreen.icon}</Box>
				<Box>{recommendations.miscellaneous.mask.icon}</Box>
				<Box>{recommendations.miscellaneous.water.icon}</Box>
				<Box>{recommendations.miscellaneous.noElectronics.icon}</Box>
				<Box>{recommendations.miscellaneous.windows.icon}</Box>
			</Box>
		</Box>
	);
};

export default RecommendationsFullView;
