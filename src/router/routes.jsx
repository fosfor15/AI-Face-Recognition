import { createBrowserRouter } from 'react-router-dom';
import SignInForm from '../pages/SignInForm/SignInForm';
import ImageRecognition from '../pages/ImageRecognition';

const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <SignInForm />
    }
]);

const privateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <ImageRecognition />
    }
]);

export { publicRoutes, privateRoutes };
