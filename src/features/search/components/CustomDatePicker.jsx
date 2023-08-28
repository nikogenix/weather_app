import * as React from "react";
import { useDispatch } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import EventIcon from "@mui/icons-material/Event";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import { setDate } from "../searchSlice";

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
	const dispatch = useDispatch();

	const handleDateChange = (newDate) => {
		dispatch(setDate(new Date(newDate).toString()));
	};

	React.useEffect(() => {
		handleDateChange(Date.now());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Stack spacing={1}>
				<ButtonDatePicker onChange={handleDateChange} />
			</Stack>
		</LocalizationProvider>
	);
}
