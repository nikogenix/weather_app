import { Box, Modal } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LoginForm from "./components/LoginForm";
import { useState } from "react";
import SignupForm from "./components/SignupForm";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const Login = ({ open, handleClose }) => {
	const [value, setValue] = useState("login");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [values, setValues] = useState({
		username: "",
		password: "",
		passwordConfirmation: "",
		showPassword: false,
		showPasswordConfirmation: false,
	});

	const handleInputChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleClickShowPasswordConfirmation = () => {
		setValues({
			...values,
			showPasswordConfirmation: !values.showPasswordConfirmation,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Modal open={open} onClose={handleClose} aria-labelledby="login-menu" aria-describedby="login-or-signup">
			<Box sx={style}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<TabList variant="fullWidth" onChange={handleChange} aria-label="login-or-signup-tabs">
							<Tab sx={{ textTransform: "none" }} label="login" value="login" />
							<Tab sx={{ textTransform: "none" }} label="signup" value="signup" />
						</TabList>
					</Box>
					<TabPanel value="login">
						<LoginForm
							values={values}
							handleInputChange={handleInputChange}
							handleClickShowPassword={handleClickShowPassword}
							handleMouseDownPassword={handleMouseDownPassword}
						/>
					</TabPanel>
					<TabPanel value="signup">
						<SignupForm
							values={values}
							handleInputChange={handleInputChange}
							handleClickShowPassword={handleClickShowPassword}
							handleClickShowPasswordConfirmation={handleClickShowPasswordConfirmation}
							handleMouseDownPassword={handleMouseDownPassword}
						/>
					</TabPanel>
				</TabContext>
			</Box>
		</Modal>
	);
};

export default Login;
