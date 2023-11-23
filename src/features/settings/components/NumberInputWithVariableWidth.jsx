import { Input } from "@mui/material";

const NumberInputWithVariableWidth = ({ value, onChange, disabled }) => {
	return (
		<>
			<Input
				sx={{
					"& input[type=number]": {
						minWidth: 9.5 + 15,
						width: String(value).length * 9.5 + 15,
						textAlign: "end",
						px: 0.5,
						pl: 3 * 0.7,
						lineHeight: 1.5,
						fontSize: 14,
					},
				}}
				type={"number"}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
		</>
	);
};

export default NumberInputWithVariableWidth;
