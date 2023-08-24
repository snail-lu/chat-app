import React from 'react';
import { Grid, Image } from 'antd-mobile'
import { useState } from 'react';
import styles from './header-selector.module.scss';

function HeaderSelector(props) {

    let headerList = [];
    for (let i = 0; i < 20; i++) {
        headerList.push({
            id: i,
            text: '头像' + (i + 1),
            icon: require(`../../assets/images/头像${i + 1}.png`)
        })
    }

    const [icon, setIcon] = useState(0)
    const handleClick = ({ text, id }) => {
        setIcon(id)
        props.setHeader(text)
    }
    return (
        <div>
            <Grid columns={4} gap={10}>
                {
                    headerList.map((item) => {
                        return (
                            <Grid.Item>
                                <div className={`flex-box-column flex-v-center ${item.id === icon ? styles['icon-selected'] : styles['icon']}`} onClick={() => handleClick(item)}>
                                    <Image src={item.icon}
                                        style={{ borderRadius: 20, width: '100%' }}
                                        fit='cover'
                                    />
                                    <div className={styles['icon-name']}>{item.text}</div>
                                </div>
                            </Grid.Item>
                        )
                    })
                }
            </Grid>
        </div>
    );

}

export default HeaderSelector;