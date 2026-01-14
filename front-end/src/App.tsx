import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { AppThemeProvider } from "./contexts";

export default function App() {
  return (
        <AppThemeProvider>
            <RouterProvider router={router} />
        </AppThemeProvider>
    );
}