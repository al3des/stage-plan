import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import { StrictMode } from "react"
import ReactDOM from "react-dom"

import App from "./App"

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

const rootElement = document.getElementById("root")
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </StrictMode>,
  rootElement
)
