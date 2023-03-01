import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { publicRoutes, privateRoutes } from './routes';
import { RouterProvider } from 'react-router-dom';


const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <RouterProvider
            router={ isAuth ? privateRoutes : publicRoutes }
        />
    );
}

export default AppRouter;
