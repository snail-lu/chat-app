import React from 'react';
import { Grid, Image } from 'antd-mobile'
import styles from './header-selector.module.scss';

function HeaderSelector(props) {

    let headerList = [];
    for (let i = 0; i < 20; i++) {
        headerList.push({
            text: '头像' + (i + 1),
            icon: require(`../../assets/images/头像${i + 1}.png`)
        })
    }

    const handleClick = ({ text }) => {
        props.onChange(text)
    }
    return (
        <div>
            <Grid columns={4} gap={10}>
                {
                    headerList.map((item) => {
                        return (
                            <Grid.Item key={item.text}>
                                <div className="flex-box-column flex-v-center" onClick={() => handleClick(item)}>
                                    <Image src={item.icon}
                                        className={`${item.text === props.selected ? styles['icon-selected'] : styles['icon']}`}
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