/**
 * 判断用户类型，返回相应的路由路径
 * @param {*} type  用户类型
 * @param {*} header  头像（根据是否存在头像来决定是否跳转至完善信息界面）
 */
export function getRedirectTo(type,header){
    let path = '';
    if(type==='boss'){
        path='/resumes'
    }else{
        path='/job'
    }

    // if(!header){
    //     path += 'info'
    // }

    return path;
}