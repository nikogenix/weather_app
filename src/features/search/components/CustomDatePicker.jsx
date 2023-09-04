import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";

import EventIcon from "@mui/icons-material/Event";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import { setDate, setDateChange } from "../searchSlice";
import { setWeather } from "../../weather/weatherSlice";
import getWeather from "../../../services/getWeather";

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

	const minDate = dayjs().add(-3, "month");
	const maxDate = dayjs().add(16, "day");

	return (
		<DateTimePicker
			slots={{ field: ButtonField, ...props.slots }}
			slotProps={{
				field: { setOpen },
				actionBar: {
					actions: ["today"],
				},
			}}
			{...props}
			open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			views={["year", "month", "day", "hours"]}
			viewRenderers={{
				hours: renderTimeViewClock,
			}}
			ampm={false}
			minDate={minDate}
			maxDate={maxDate}
		/>
	);
}

export default function PickerWithButtonField() {
	const dispatch = useDispatch();

	const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);
	const { location } = useSelector((state) => state.search);

	const handleDateInitialisation = (newDate) => {
		dispatch(setDate(new Date(newDate).toString()));
	};

	const handleDateChange = async (newDate) => {
		const formattedDate = new Date(newDate).toString();
		dispatch(setDate(formattedDate));
		dispatch(setDateChange(true));

		const { data, aqi } = await getWeather(formattedDate, location, temperatureUnit);
		console.log(data);
		console.log(location);
		dispatch(setWeather({ ...data, location, aqi }));
	};

	React.useEffect(() => {
		handleDateInitialisation(Date.now());
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
