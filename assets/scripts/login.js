function saveLoginInfo(username, userId) {
    const loginInfo = {
        username: username,
        userId: userId
    };
    console.log(loginInfo);
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
}


function submitForm(event) {
    // function submitForm() {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取表单输入框的值
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    fetch('./php/login.php', {
        method: 'POST',
        body: {
            username: username,
            password: password,
        }
    })
        .then(res => {
            // res.json()
            return res;
        })
        .then(data => {
            // alert(username);
            // alert(password);
            console.log(typeof data);  // 判断类型
            // console.log(data.success);
            console.log(data.username);
            console.log(data.userId)
            alert('stop!');
            // if (data.success) {
            window.location.href = "./index.html";
            window.location.assign = "./index.html";
            window.location.replace = "./index.html";
            console.log(window.location.href);
            // console.log(window.location.assign);
            // console.log(window.location.replace);
            // console.log(window.location);
            console.log(data.userId);
            console.log(data.username);
            saveLoginInfo(data.username, data.userId);
            alert('stop!again');
            // } else {
            //     alert("Incorrect username or password!");
            //     window.location.href = "./login.html";
            // }
        })
    

}
function switchToRegister() {
    window.location.href = "register.html";
}
