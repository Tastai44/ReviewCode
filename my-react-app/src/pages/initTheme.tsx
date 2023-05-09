import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
import { deepPurple, yellow } from "@mui/material/colors"

const theme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: yellow[600],
				},
				secondary:{
					main: "#0000",
					
				}
			},
		},
		dark: {
			palette: {
				primary: {
					main: yellow[400],
				},
			},
		},
	},
})

export default theme