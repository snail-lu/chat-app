import { Image } from 'antd-mobile';
import styles from './chat-item.module.scss';

export default function ChatItem(props) {
    const { msg, position, avatar } = props;
    return (
        <div className={`flex-box flex-v-start ${styles['chat-item']}`}>
            {
                <Image
                    className={`flex-shrink-0 ${(position === 'left' ? styles['show-avatar'] : styles['hide-avatar'])}`}
                    src={require(`../../assets/images/${avatar}.png`)}
                    width={32}
                    height={32}
                    fit='cover'
                    style={{ borderRadius: 5 }}
                />
            }
            <div className={`flex-item-1 flex-box ${(position === 'left' ? 'flex-h-start ' : 'flex-h-end ')}` }>
                <div className={`${styles['msg-box']} ${position==='left' ? styles['msg-box-left']: styles['msg-box-right']}`}>{msg.content}</div>
            </div>
            {
                <Image
                    className={`flex-shrink-0 ${(position === 'right' ? styles['show-avatar']: styles['hide-avatar'])}` } 
                    src={require(`../../assets/images/${avatar}.png`)}
                    width={32}
                    height={32}
                    fit='cover'
                    style={{ borderRadius: 5 }}
                />
            }
        </div>
    )
}