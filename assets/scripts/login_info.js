/*
 * @Author: ZMark
 * @Date: 2023-05-30 10:23:41
 * @LastEditors: ZMark
 * @LastEditTime: 2023-05-30 12:12:23
 * @FilePath: \Artistic-Realm\ar-front\scripts\common\login_info.js
 * @Description: 登陆信息相关的公共模块
 * 
 * Copyright (c) 2023 by ZMark, All Rights Reserved. 
 */

// 存储登录信息到本地存储
function saveLoginInfo(username, userId) {
    const loginInfo = {
        username: username,
        userId: userId
    };
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
}

// 是否登录
function isLogin() {
    return getLoginInfo() !== null;
}

// 获取本地存储中的登录信息
function getLoginInfo() {
    const loginInfo = localStorage.getItem('loginInfo');
    return JSON.parse(loginInfo);
}

// 获取用户ID
function getUserIdFromLocalStorage() {
    const loginInfo = getLoginInfo();
    if (loginInfo) {
        return loginInfo.userId;
    }
    return null;
}

// 获取用户名
function getUsernameFromLocalStorage() {
    const loginInfo = getLoginInfo();
    if (loginInfo) {
        return loginInfo.username;
    }
    return null;
}

// 清除本地存储中的登录信息
function clearLoginInfo() {
    localStorage.removeItem('loginInfo');
}


