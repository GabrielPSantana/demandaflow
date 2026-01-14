import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";

export default function App() {
  return (
        <ThemeProvider theme={lightTheme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}