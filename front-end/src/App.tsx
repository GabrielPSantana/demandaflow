import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';

export default function App() {
    return (
        <AppThemeProvider>
            <DrawerProvider>
                <RouterProvider router={router} />                  
            </DrawerProvider>
        </AppThemeProvider>
    );
}
