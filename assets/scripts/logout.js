
var btn = document.getElementById('log-out-btn');
btn.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 设置请求的 URL 和方法
    xhr.open('GET', './php/logout.php');

    // 设置请求完成后的回调函数
    xhr.onload = function () {
        if (xhr.status === 200) {
            // 重定向到登录页面
            window.location.href = 'login.html';
            // alert("Logout successful.");
        }
    };

    // 发送 AJAX 请求
    xhr.send();
});