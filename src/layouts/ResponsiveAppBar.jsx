import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleTemperatureUnit } from "../store/settingsSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SearchForm from "../features/search/SearchForm";
import SettingsIcon from "@mui/icons-material/Settings";
import getWeather from "../services/getWeather";
import { setWeather } from "../features/weather/weatherSlice";

import Settings from "../features/settings";
import Login from "../features/login";
import { Divider } from "@mui/material";

const userMenu = [{ name: "preferences" }, { name: "login" }, { name: "logout" }];
const pages = [
	{ name: "home", path: "/" },
	{ name: "plan a trip", path: "/trip" },
];

const ResponsiveAppBar = () => {
	const dispatch = useDispatch();

	const [anchorElNav, setAnchorElNav] = useState(null);
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const [anchorElUser, setAnchorElUser] = useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = (button) => {
		const menuStatus = anchorElUser;
		setAnchorElUser(null);
		if (button === "preferences" && menuStatus) handleOpenFullSettingsMenu();
		if (button === "login" && menuStatus) handleOpenLoginModal();
	};

	const [anchorElSettings, setAnchorElSettings] = useState(null);
	const handleOpenSettingsMenu = (event) => {
		setAnchorElSettings(event.currentTarget);
	};
	const handleCloseSettingsMenu = () => {
		setAnchorElSettings(null);
	};

	const [settingsMenu, setSettingsMenu] = useState(false);
	const handleOpenFullSettingsMenu = () => {
		setSettingsMenu(true);
	};
	const handleCloseFullSettingsMenu = () => {
		setSettingsMenu(false);
	};

	const [loginModal, setLoginModal] = useState(false);
	const handleOpenLoginModal = () => {
		setLoginModal(true);
	};
	const handleCloseLoginModal = () => {
		setLoginModal(false);
	};

	const darkMode = useSelector((state) => state.settings.darkMode);
	const handleColorModeChange = () => dispatch(toggleDarkMode());

	const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);
	const { date, location } = useSelector((state) => state.search);
	const handleTemperatureUnitChange = async () => {
		dispatch(toggleTemperatureUnit());

		if (location) {
			const { data, aqi } = await getWeather(date, location, temperatureUnit === "C" ? "F" : "C");
			console.log(data);
			console.log(location);
			dispatch(setWeather({ ...data, location, aqi }));
		}
	};

	const isSmallScreen = useMediaQuery("only screen and (max-width : 599px)");

	useEffect(() => {
		handleCloseNavMenu();
		handleCloseSettingsMenu();
		handleCloseUserMenu();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSmallScreen]);

	return (
		<AppBar position="sticky" color="primary">
			<Container maxWidth="xl" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
							onClick={handleOpenNavMenu}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							disableScrollLock={true}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
								mt: 1.1,
								translate: "-15px 0",
							}}
						>
							{pages.map((page, i) => (
								<Box key={page.name}>
									<MenuItem
										key={page.name}
										onClick={handleCloseNavMenu}
										component={Link}
										to={page.path}
										sx={{ px: 3 }}
									>
										<Typography textAlign="center">{page.name}</Typography>
									</MenuItem>
									{i !== pages.length - 1 && <Divider sx={{ marginTop: 0 }} />}
								</Box>
							))}
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page.name}
								onClick={handleCloseNavMenu}
								component={Link}
								to={page.path}
								sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ display: "flex", mr: 1, flexGrow: 2, flexShrink: 2 }}>
						<SearchForm />
					</Box>

					{!isSmallScreen && (
						<Box sx={{ flexGrow: 0, flexShrink: 0, display: "flex" }}>
							<IconButton onClick={handleTemperatureUnitChange} color="inherit">
								<>
									<DeviceThermostatIcon /> <Typography>°{temperatureUnit}</Typography>
								</>
							</IconButton>

							<IconButton sx={{ mr: 1 }} onClick={handleColorModeChange} color="inherit">
								{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
							</IconButton>

							<Tooltip title="open menu">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="N" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: 7.2, justifyContent: "flex-end", translate: "15px 0" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								disableScrollLock={true}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{userMenu.map((setting, i) => (
									<Box key={setting.name}>
										<MenuItem
											onClick={() => handleCloseUserMenu(setting.name)}
											sx={{ px: 3, justifyContent: "flex-end" }}
										>
											<Typography variant="caption" fontSize={15}>
												{setting.name}
											</Typography>
										</MenuItem>
										{i !== userMenu.length - 1 && <Divider sx={{ marginTop: 0 }} />}
									</Box>
								))}
							</Menu>
						</Box>
					)}

					{isSmallScreen && (
						<Box sx={{ flexGrow: 0, flexShrink: 0, display: "flex" }}>
							<Tooltip title="open settings">
								<IconButton
									onClick={handleOpenSettingsMenu}
									sx={{ p: 1 }}
									size="large"
									aria-label="settings button"
									aria-controls="mobile-menu-appbar"
									aria-haspopup="true"
									color="inherit"
								>
									<SettingsIcon />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: 5.6, translate: "15px 0" }}
								id="mobile-menu-appbar"
								anchorEl={anchorElSettings}
								anchorOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								disableScrollLock={true}
								open={Boolean(anchorElSettings)}
								onClose={handleCloseSettingsMenu}
							>
								<IconButton sx={{ ml: 2 }} onClick={handleTemperatureUnitChange} color="inherit">
									<>
										<DeviceThermostatIcon /> <Typography>°{temperatureUnit}</Typography>
									</>
								</IconButton>

								<IconButton sx={{ mr: 1 }} onClick={handleColorModeChange} color="inherit">
									{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
								</IconButton>

								<Tooltip title="open menu">
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										color="inherit"
										onClick={handleOpenUserMenu}
										sx={{ p: 0, mr: 2 }}
									>
										<Avatar alt="N" src="/static/images/avatar/2.jpg" />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: 6.7, translate: "15px 0" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									disableScrollLock={true}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{userMenu.map((setting, i) => (
										<Box key={setting.name}>
											<MenuItem
												onClick={() => handleCloseUserMenu(setting.name)}
												sx={{ px: 3, justifyContent: "flex-end" }}
											>
												<Typography variant="caption" fontSize={15}>
													{setting.name}
												</Typography>
											</MenuItem>
											{i !== userMenu.length - 1 && <Divider sx={{ marginTop: 0 }} />}
										</Box>
									))}
								</Menu>
							</Menu>
						</Box>
					)}

					<Settings open={settingsMenu} handleClose={handleCloseFullSettingsMenu} />
					<Login open={loginModal} handleClose={handleCloseLoginModal} />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default ResponsiveAppBar;
