import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { AppThemeProvider } from './shared/contexts';
import { Sidebar } from './shared/components/Sidebar/Sidebar';

export default function App() {
    return (
        <AppThemeProvider>
                <RouterProvider router={router} />                
        </AppThemeProvider>
    );
}
