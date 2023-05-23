import Register from '../containers/register/register';
import Login from '../containers/login/login';
import Chat from '../containers/chat/chat';
import Main from '../containers/main/main';
import ErrorPage from '../components/error-page/error-page';
import Message from '../containers/message/message';
import Friends from '../containers/friends/friends';
import Discover from '../containers/friends/friends';
import Personal from '../containers/personal/personal';


const routes = [
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'message',
                element: <Message />
            },
            {
                path: 'friends',
                element: <Friends />
            }, 
            {
                path: 'discover',
                element: <Discover />
            },
            {
                path: 'personal',
                element: <Personal />
            }
        ]
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