import Box from "@mui/material/Box";
import { FormControl, Input, InputLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

export default function Login({ values, handleInputChange, handleClickShowPassword, handleMouseDownPassword }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				mt: 3,
			}}
		>
			<FormControl>
				<InputLabel shrink>username</InputLabel>
				<Input autoFocus value={values.username} onChange={handleInputChange("username")} />
			</FormControl>
			<FormControl sx={{ my: 1 }}>
				<InputLabel shrink>password</InputLabel>
				<Input
					type={values.showPassword ? "text" : "password"}
					value={values.password}
					onChange={handleInputChange("password")}
					endAdornment={
						<InputAdornment>
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								sx={{ mb: 2 }}
							>
								{values.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
		</Box>
	);
}
