/*
 * @Author: ZMark
 * @Date: 2023-05-25 20:33:12
 * @LastEditors: ZMark
 * @LastEditTime: 2023-05-30 10:34:58
 * @FilePath: \Artistic-Realm\ar-front\scripts\login.js
 * @Description: 处理登陆页面相关事件-生成验证码、校验表单信息，发送登陆请求并处理响应
 * 
 * Copyright (c) 2023 by ZMark, All Rights Reserved. 
 */

//生成第一张验证码
let rightCaptcha = generateCaptcha();

//监听注册提交事件
addListenerForLoginSubmit();

function handleCaptchaChange() {
    rightCaptcha = generateCaptcha();
}

function login(username, password, captcha) {
    // console.log('rightCaptcha', rightCaptcha);
    // 进行表单验证
    let errorMessageElement = document.getElementById('error-message'); // 错误信息元素
    // 进行表单验证
    if (username === '') {
        errorMessageElement.innerHTML = '用户名不能为空';
        return;
    }
    if (password === '') {
        errorMessageElement.innerHTML = '密码不能为空';
        return;
    }
    if (captcha === "") {
        errorMessageElement.innerHTML = '验证码不能为空';
        return;
    }
    if (captcha !== rightCaptcha) {
        errorMessageElement.innerHTML = '验证码不匹配';
        handleCaptchaChange();
        return;
    }
    const body = {
        username: username,
        password: password
    };
    fetchWithBody('/login.php', 'POST', body)
        .then(resp => resp.json())
        .then(respData => {
            // 处理返回的数据
            console.log(respData.message);
            if (respData.success) {
                // 登陆成功
                // 存储用户id和用户名到localStorage
                saveLoginInfo(username, respData.data);
                // 跳转到首页
                window.location.href = "../homeView/home.html";
            } else {
                // 登陆失败，处理错误
                if (respData.errors) {
                    let errorMessage = '';
                    respData.errors.forEach(error => {
                        errorMessage += error + '<br>';
                    });
                    errorMessageElement.innerHTML = errorMessage; // 更新错误信息
                }
            }
        })
        .catch(error => {
            console.error(error);
            errorMessageElement.textContent = '出错了，请稍后再试~'; // 更新错误信息
        });
}

function addListenerForLoginSubmit() {
    // 在页面加载完成后获取表单元素并添加事件监听器
    window.addEventListener('DOMContentLoaded', function () {
        let form = document.getElementById('login-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // 阻止表单提交默认行为
            let username = form.querySelector('[name="username"]').value;
            let password = form.querySelector('[name="password"]').value;
            let captcha = form.querySelector('[name="captcha"]').value;
            login(username, password, captcha);
        });
    });
}