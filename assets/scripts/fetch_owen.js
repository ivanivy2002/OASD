/*
 * @Author: ZMark
 * @Date: 2023-05-25 16:30:49
 * @LastEditors: ZMark
 * @LastEditTime: 2023-06-01 12:27:48
 * @FilePath: \Artistic-Realm\ar-front\scripts\fetch.js
 * @Description: 公共模块，和fetch请求相关的配置和公共方法
 * 
 * Copyright (c) 2023 by ZMark, All Rights Reserved. 
 */
const baseUrl = 'http://localhost:3000/ar-rear/api';

function fetchWithBody(url, method, body) {
    // 拼接完整的请求路径
    const fullUrl = baseUrl + url;
    // 设置请求配置对象
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json', // 根据需要设置适当的 Content-Type
        },
        body: JSON.stringify(body), // 如果存在请求体，则将其转换为 JSON 字符串
    };
    // 发起请求
    return fetch(fullUrl, requestOptions);
}

function fetchFileUpload(url, formData) {
    const fullUrl = baseUrl + url;
    return fetch(fullUrl, {
        method: "POST",
        body: formData,
    });
}

function fetchFormData(url, method, formData) {
    // 拼接完整的请求路径
    const fullUrl = baseUrl + url;
    // 设置请求配置对象
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    };
    // 发起请求
    return fetch(fullUrl, requestOptions);
}

function fetchQueryParamWithBaseUrl(urlWithQueryParam) {
    // 拼接完整的请求路径
    const fullUrl = baseUrl + urlWithQueryParam;
    // 发起请求
    return fetch(fullUrl);
}

function createFormDataBody(body) {
    const params = new URLSearchParams();
    for (const key in body) {
        params.append(key, body[key]);
    }
    return params.toString();
}
