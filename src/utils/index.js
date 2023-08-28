/**
 * 判断用户类型，返回相应的路由路径
 * @param {*} type  用户类型
 * @param {*} header  头像（根据是否存在头像来决定是否跳转至完善信息界面）
 */
export function getRedirectTo(){
    return '/friends';
}

/**
 * 对用户消息列表按chat_id进行分组
 * 1.找出每个聊天的lastMsg,并用一个对象容器来保存{chat_id,lastMsg}
 * 2.得到所有lastMsg的数组
 * 3.对数组进行排序（按create_time降序）
 * @returns {} 并得到每个组的lastMsg组成的数组
 */
export function getLastMsgs(chatMsgs, userid){
    //1.
    const lastMsgObjs = {};
    chatMsgs.forEach(msg=>{
        //统计未读消息个数
        if(msg.to===userid && !msg.read){
            msg.unReadCount = 1;
        }else{
            msg.unReadCount = 0;
        }


        const chatId = msg.chat_id;
        let lastMsg = lastMsgObjs[chatId];
        if(!lastMsg){
            lastMsgObjs[chatId] = msg;
        }else{
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId] = msg;
            }
            lastMsgObjs[chatId].unReadCount = unReadCount;
        }
    })

    //2.
    const lastMsgs = Object.values(lastMsgObjs);

    //3.
    lastMsgs.sort(function(m1,m2){
        return m2.create_time - m1.create_time;
    })

    return lastMsgs;
}