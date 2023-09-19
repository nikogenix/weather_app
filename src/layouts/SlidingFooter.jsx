/**
 * code snippet for finding the bottom of the page from:
 * https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
 */

import { useEffect, useState } from "react";

import { AppBar, Typography, Link, Divider, Toolbar, Slide } from "@mui/material";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useLocation } from "react-router-dom";

function HideOnScroll(props) {
	const { children, setIsShortPage } = props;
	const trigger = useScrollTrigger();
	const [reachedBottom, setReachedBottom] = useState(false);

	useEffect(() => {
		const checkPageHeight = () => {
			setIsShortPage(document.documentElement.scrollHeight <= window.innerHeight);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("scroll", checkPageHeight);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("scroll", checkPageHeight);
		};
	}, [setIsShortPage]);

	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) {
			setReachedBottom(false);
			return;
		}
		setReachedBottom(true);
	}

	return (
		<Slide appear={false} direction="up" in={!trigger || reachedBottom} mountOnEnter>
			{children}
		</Slide>
	);
}

const SlidingFooter = (props) => {
	const location = useLocation();
	const [isShortPage, setIsShortPage] = useState(true);

	useEffect(() => {
		const checkPageHeight = () => {
			setIsShortPage(document.documentElement.scrollHeight <= window.innerHeight);
		};

		window.addEventListener("resize", checkPageHeight);
		checkPageHeight();

		return () => window.removeEventListener("resize", checkPageHeight);
	}, [location.key]);

	return (
		<HideOnScroll {...props} isShortPage={isShortPage} setIsShortPage={setIsShortPage}>
			<AppBar
				component="footer"
				position={isShortPage ? "absolute" : "sticky"}
				color="primary"
				sx={{ top: "auto", bottom: 0, display: "flex", flexDirection: "column" }}
			>
				<Toolbar sx={{ justifyContent: "center" }}>
					<Typography
						sx={{
							textAlign: "right",
							flex: 2,
							flexDirection: "column",
							display: { xs: "flex", sm: "none" },
						}}
					>
						data from{" "}
						<Link color="secondary" href="https://open-meteo.com/">
							open-meteo.com
						</Link>
					</Typography>

					<Typography
						sx={{
							textAlign: "right",
							flex: 2,
							flexDirection: "row",
							display: { xs: "none", sm: "inline" },
						}}
					>
						data from{" "}
						<Link color="secondary" href="https://open-meteo.com/">
							open-meteo.com
						</Link>
					</Typography>

					<Divider sx={{ height: 28, m: 2 }} orientation="vertical" />

					<Typography sx={{ flex: 2, flexDirection: "column", display: { xs: "flex", sm: "none" } }}>
						made by{" "}
						<Link color="secondary" href="https://github.com/nikogenix">
							nikogenix
						</Link>
					</Typography>

					<Typography sx={{ flex: 2, flexDirection: "row", display: { xs: "none", sm: "inline" } }}>
						made by{" "}
						<Link color="secondary" href="https://github.com/nikogenix">
							nikogenix
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
};

export default SlidingFooter;
