import Register from '../containers/register/register';
import Login from '../containers/login/login';
import Main from '../containers/main/main';
import ErrorPage from '../components/error-page/error-page';

export default [
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />
    }, 
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'login',
        element: <Login />
    }
]