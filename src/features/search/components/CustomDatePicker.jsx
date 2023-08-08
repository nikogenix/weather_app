import * as React from "react";

import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import EventIcon from "@mui/icons-material/Event";
import { IconButton } from "@mui/material";

function ButtonField(props) {
	const { setOpen, id, disabled, InputProps: { ref } = {}, inputProps: { "aria-label": ariaLabel } = {} } = props;

	return (
		<IconButton
			variant="outlined"
			id={id}
			disabled={disabled}
			ref={ref}
			aria-label={ariaLabel}
			onClick={() => setOpen?.((prev) => !prev)}
		>
			<EventIcon />
		</IconButton>
	);
}

function ButtonDatePicker(props) {
	const [open, setOpen] = React.useState(false);

	return (
		<DateTimePicker
			slots={{ field: ButtonField, ...props.slots }}
			slotProps={{ field: { setOpen } }}
			{...props}
			open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
		/>
	);
}

export default function PickerWithButtonField() {
	const [value, setValue] = React.useState(null);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Stack spacing={1}>
				<ButtonDatePicker value={value} onChange={(newValue) => setValue(newValue)} />
			</Stack>
		</LocalizationProvider>
	);
}
