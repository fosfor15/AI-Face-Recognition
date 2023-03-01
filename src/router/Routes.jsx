import { createBrowserRouter } from 'react-router-dom';

import SignInForm from '../pages/SignInForm';
import RegistrationForm from '../pages/RegistrationForm';
import ImageRecognition from '../pages/ImageRecognition';


const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <SignInForm />
    },
    {
        path: '/registration',
        element: <RegistrationForm />
    }
]);

const privateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <ImageRecognition />
    }
]);

export { publicRoutes, privateRoutes };
