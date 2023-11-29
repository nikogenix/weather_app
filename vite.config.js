import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

export default defineConfig({
	plugins: [react(), svgr()],
	optimizeDeps: {
		include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
	},
});
