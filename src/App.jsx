import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from './redux/userSlice';
import { getMsgList, receiveMsg } from './redux/chatSlice';

function App({ children }) {
    const dispatch = useDispatch()
    //发送异步申请，获取对应的user
    dispatch(getUser()).unwrap().then(res => {
        const { _id } = res.result;
        initIO(_id)
        dispatch(getMsgList(_id))
    })


    //初始化socketIO
    const initIO = (userid) => {
        if (!io.socket) {
            //连接服务器，创建代表连接的socket对象
            io.socket = io('ws://localhost:4000')
            //绑定'receiveMessage'的监听，来接收服务器发送的消息
            io.socket.on('receiveMsg', function (chatMsg) {
                console.log('浏览器端接收到消息', chatMsg)
                //只有当chatMsg是与当前用户相关的信息，才去分发同步action保存消息
                if (userid === chatMsg.from || userid === chatMsg.to) {
                    dispatch(receiveMsg({ chatMsg, userid }))
                }
            })
        }
    }
    
    return children;
}

export default App;
