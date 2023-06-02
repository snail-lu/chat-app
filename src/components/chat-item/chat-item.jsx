import { Image } from 'antd-mobile';
import styles from './chat-item.module.scss';

export default function ChatItem(props) {
    const { msg, position, avatar } = props;
    return (
        <div className="flex-box">
            {
                position==='left' && 
                <Image
                src={require(`../../assets/images/${avatar}.png`)}
                width={48}
                height={48}
                fit='cover'
                style={{ borderRadius: 32 }}
            />
            }
            <div className={styles['msg-box']}>{msg.content}</div>
        </div>
    )
}