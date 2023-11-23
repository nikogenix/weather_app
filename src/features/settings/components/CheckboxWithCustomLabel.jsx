import { Box, Checkbox, Typography } from "@mui/material";

const CheckboxWithCustomLabel = ({ checked, handleChange, children }) => {
	const ariaLabel =
		typeof children === "string"
			? children
			: children.reduce((acc, c) => {
					if (typeof c === "string") return acc + c;
					else if (c.props.value) return acc + c.props.value;
					else return acc;
			  }, "");

	return (
		<Box sx={{ display: "flex", alignContent: "center", alignItems: "center", mb: 1.5 }}>
			<Checkbox
				checked={checked}
				onChange={handleChange}
				inputProps={{ "aria-label": ariaLabel }}
				sx={{ height: "fit-content" }}
			/>
			<Typography variant="p" component="span" sx={{ lineHeight: 1.5 }}>
				{children}
			</Typography>
		</Box>
	);
};

export default CheckboxWithCustomLabel;
