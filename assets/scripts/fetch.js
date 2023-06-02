
const baseUrl = './php/';

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