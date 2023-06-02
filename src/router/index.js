import Register from '../containers/register/register';
import Login from '../containers/login/login';
import Chat from '../containers/chat/chat';
import Main from '../containers/main/main';
import ErrorPage from '../components/error-page/error-page';
import Message from '../containers/message/message';
import Friends from '../containers/friends/friends';
import Discover from '../containers/discover/discover';
import My from '../containers/my/my';


const routes = [
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'messages',
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
                path: 'my',
                element: <My />
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