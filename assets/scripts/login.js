
function submitForm(event) {
    // function submitForm() {
    event.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单输入框的值
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    alert(username);
    alert(password);
    // 发送 AJAX 请求到后端 PHP 脚本
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/login.php", false);//使用同步
    // xhr.open("POST", "./php/login.php", true); //使用异步
    // xhr.open("POST", "/OASD/php/login.php", true); //使用异步
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + username + "&password=" + password);
    // xhr.send();
    // 检查登录结果
    xhr.onload = function () {
        if (xhr.responseText === "success") {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            // 将它们保存到 localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            // alert("Login successful!");
            // 显示登录成功的提示框
            var successBox = document.getElementById("success-box");
            successBox.style.display = "block";
            setTimeout(function () {
                successBox.style.display = "none";
            }, 3000);
            // window.location.href = "http://localhost/OASD/index.html"; // 将用户重定向到主页
            // window.location.href = "index.html"; 
            // 将用户重定向到主页
            location.href = "./index.html";
            //2s jump
            setTimeout(function () {
                window.location.href = "./index.html";
            }, 2000);
            // window.location.href = "./index.html";
            // .代表当前目录
            return true;
        } else {
            // 显示登录失败的提示框
            var errorBox = document.getElementById("error-box");
            errorBox.style.display = "block";
            // alert("Login failed. Please check your username and password.");
            location.href = "./login.html";
            //2s jump
            setTimeout(function () {
                window.location.href = "./login.html";
            }, 2000);
            // window.location.href = "./login.html"; // 将用户重定向到登录
            return false;
        }
    }
}
function switchToLogin() {
    window.location.href = "register.html";
}
