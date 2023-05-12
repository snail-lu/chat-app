import { useRouteError, useNavigate  } from 'react-router-dom';
import { Button } from 'antd-mobile-v2';

export default function ErrorPage() {
    const navigate = useNavigate()
    const error = useRouteError()
    return (
        <div>
            <h2>抱歉，页面发生错误</h2>
            <p>{error.statusText || error.message}</p>
            <Button type='primary' onClick={()=>navigate("/")}>回到首页</Button>
        </div>
    );
}
