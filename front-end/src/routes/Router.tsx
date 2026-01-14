import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Tasks from '../pages/tasks/Tasks';

const isAuthenticated = () => {
    return true;
};

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: isAuthenticated() ? <RootLayout /> : <Navigate to="/login" />,
        children: [
            {
                index: true,
                element: <Tasks />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
