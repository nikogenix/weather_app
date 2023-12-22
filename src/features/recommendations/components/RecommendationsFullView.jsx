import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import BoxWithTooltip from "./BoxWithTooltip";

const RecommendationsFullView = ({ recommendations, alignment }) => {
	const [minMaxAvgClothing, setMinMaxAvgClothing] = useState("avg");
	const handleClothingToggle = (event, newValue) => {
		if (newValue !== null) setMinMaxAvgClothing(newValue);
	};
	console.log(recommendations);
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
				<BoxWithTooltip
					content={recommendations.clothing.upperClothingLayer?.[minMaxAvgClothing]}
					tooltipEnabled={recommendations.clothing.upperClothingLayer?.incompleteData}
					sx={{
						position: "relative",
						top: 15,
						left: 5,
						minWidth: recommendations.clothing.upperClothing
							? recommendations.clothing.upperClothing[minMaxAvgClothing].props.size
							: "auto",
					}}
				/>
				<BoxWithTooltip
					content={recommendations.clothing.upperClothing?.[minMaxAvgClothing]}
					tooltipEnabled={recommendations.clothing.upperClothing?.incompleteData}
				/>
				<BoxWithTooltip
					content={recommendations.clothing.lowerClothing?.[minMaxAvgClothing]}
					tooltipEnabled={recommendations.clothing.lowerClothing?.incompleteData}
				/>
				<BoxWithTooltip
					content={recommendations.clothing.boots?.[minMaxAvgClothing]}
					tooltipEnabled={recommendations.clothing.boots?.incompleteData}
					sx={{ position: "relative", top: 15, left: -10 }}
				/>
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
				<BoxWithTooltip
					content={recommendations.accessories.glovesCapComforter.icon}
					tooltipEnabled={recommendations.accessories.glovesCapComforter.incompleteData}
					disabled={recommendations.accessories.glovesCapComforter.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.accessories.sunHatUmbrella.icon}
					tooltipEnabled={recommendations.accessories.sunHatUmbrella.incompleteData}
					disabled={recommendations.accessories.sunHatUmbrella.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.accessories.sunglasses.icon}
					tooltipEnabled={recommendations.accessories.sunglasses.incompleteData}
					disabled={recommendations.accessories.sunglasses.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.accessories.umbrellaRainCoat.icon}
					tooltipEnabled={recommendations.accessories.umbrellaRainCoat.incompleteData}
					disabled={recommendations.accessories.umbrellaRainCoat.disabled}
				/>
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
				<BoxWithTooltip
					content={recommendations.miscellaneous.sunscreen.icon}
					tooltipEnabled={recommendations.miscellaneous.sunscreen.incompleteData}
					disabled={recommendations.miscellaneous.sunscreen.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.miscellaneous.mask.icon}
					tooltipEnabled={recommendations.miscellaneous.mask.incompleteData}
					disabled={recommendations.miscellaneous.mask.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.miscellaneous.water.icon}
					tooltipEnabled={recommendations.miscellaneous.water.incompleteData}
					disabled={recommendations.miscellaneous.water.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.miscellaneous.noElectronics.icon}
					tooltipEnabled={recommendations.miscellaneous.noElectronics.incompleteData}
					disabled={recommendations.miscellaneous.noElectronics.disabled}
				/>
				<BoxWithTooltip
					content={recommendations.miscellaneous.windows.icon}
					tooltipEnabled={recommendations.miscellaneous.windows.incompleteData}
					disabled={recommendations.miscellaneous.windows.disabled}
				/>
			</Box>
		</Box>
	);
};

export default RecommendationsFullView;
