function saveLoginInfo(username, userId) {
    const loginInfo = {
        username: username,
        userId: userId
    };
    console.log('here'+loginInfo);
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
}

function submitForm(e) {
    // function submitForm() {
    e.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单输入框的值
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    // console.log(username);
    // console.log(JSON.stringify({ username: username, password: password }));
    // alert('before fetch');
    const body = {
        username: username,
        password: password
    };
    console.log(JSON.stringify(body)),
    console.log(body);
    fetchWithBody('login.php', 'POST', body)
        .then(resp => resp.json())
        .then(respData => {
            try {
                // 尝试解析 JSON 数据
                // const result = JSON.parse(respData);
                const result = respData;
                // 处理解析后的数据
                console.log(result);
                if (result.success) {
                    // 登陆成功
                    // 存储用户id和用户名到localStorage
                    // saveLoginInfo(username, result.data);
                    const loginInfo = {
                        username: username,
                        userId: result.data,
                    };
                    console.log('here'+loginInfo);
                    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
                    localStorage.setItem('username', username);
                    localStorage.setItem('userId', result.data);
                    // alert(username);
                    // alert(result);
                    // alert(result.data);
                    // 跳转到首页
                    window.location.href = "./index.html";
                }
                // ...
            } catch (error) {
                // 解析 JSON 数据时出现错误，处理错误并向用户显示错误提示
                console.error('Failed to parse JSON data:', error);
                // ...
            }
        })
    // 处理返回的数据
    // console.log(respData.message);
    // if (respData.success) {
    //     // 登陆成功
    //     // 存储用户id和用户名到localStorage
    //     saveLoginInfo(username, respData.data);
    //     // 跳转到首页
    //     window.location.href = "./index.html";
    // } else {
    //     // 登陆失败，处理错误
    //     if (respData.errors) {
    //         // let errorMessage = '';
    //         // respData.errors.forEach(error => {
    //         //     errorMessage += error + '<br>';
    //         // });
    //         // errorMessageElement.innerHTML = errorMessage; // 更新错误信息
    //     }
    // }
    // })
    // .catch(error => {
    //     console.error(error);
    //     errorMessageElement.textContent = '出错了，请稍后再试'; // 更新错误信息
    // });
    // fetch('./php/login.php', {
    //     method: 'POST',
    //     body: JSON.stringify({ username: username, password: password }),
    // })
    //     .then(res =>
    //         res.json()
    //     )
    //     .then(data => {
    //         // alert(password);
    //         alert(username + ' before type of data');
    //         console.log('typeof data ' + typeof data);  // 判断类型
    //         alert(username + ' before data');
    //         console.log('data ' + data);
    //         alert(username + ' after data');
    //         // console.log(data.success);
    //         console.log('data.username ' + data.username);
    //         alert('af data.username');
    //         console.log('data.username ' + data.userId)
    //         alert('af data.userId');
    //         // if (data.success) {
    //         window.location.href = "./index.html";
    //         window.location.assign = "./index.html";
    //         window.location.replace = "./index.html";
    //         console.log(window.location.href);
    //         // console.log(window.location.assign);
    //         // console.log(window.location.replace);
    //         // console.log(window.location);
    //         console.log(data.userId);
    //         console.log(data.username);
    //         // saveLoginInfo(data.username, data.userId);
    //         alert('stop!again');
    //         // } else {
    //         //     alert("Incorrect username or password!");
    //         //     window.location.href = "./login.html";
    //         // }
    //     })
    //     .catch(error => {
    //         console.error('Fetch error:', error);
    //     });


}
function switchToRegister() {
    window.location.href = "register.html";
}
function jumpIndex() {
    window.location.href = "index.html";
}


