/**
 * 
 * 包含了n个接口请求的函数的模块
 * 函数返回值为promise对象
 */
import request from './request';

//注册接口
export const reqRegister = (user)=>request('/api/user/register',user,'POST')

//登录接口
export const reqLogin = ({username,password}) =>request('/api/user/login',{username,password},'POST')

//完善用户信息接口
export const reqUpdateUser = (user)=>request('/api/user/update',user,'POST');

//获取用户信息接口
export const reqUser = ()=>request('/api/user/detail');

//获取用户列表接口
export const reqUserList = ()=>request('/api/user/list',{},'POST');

//获取消息列表
export const reqChatList = ()=>request('/api/chat/list');

// 获取会话详情
export const reqChatDetail = ({ chat_id })=>request('/api/chat/detail', { chat_id }, 'POST');

//修改指定消息为已读
export const reqReadMsg = (from)=>request('/api/chat/readmsg',{from},'POST')