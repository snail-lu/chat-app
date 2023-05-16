import Register from '../containers/register/register';
import Login from '../containers/login/login';
import Chat from '../containers/chat/chat';
import Main from '../containers/main/main';
import ErrorPage from '../components/error-page/error-page';

const routes = [
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
    },
    {
        path: '/chat/:userid',
        element: <Chat /> 
    }
]
export default routes;