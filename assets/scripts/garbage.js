 //card.js
 // var xhr = new XMLHttpRequest();
  // xhr.open('GET', './php/getpaintings.php', true);
  // // xhr.open('GET', '../OASD/php/getpaintings.php', false);
  // xhr.send();
  // // console.log("new");

  // xhr.onload = function () {
  //   // console.log('onload called!');
  //   if (xhr.responseText.startsWith("{")) {
  //     // 解析JSON
  //   } else {
  //     alert(xhr.responseText); // 显示SQL错误等
  //   }
  //   // console.log(xhr.responseText);

  //   // var data = JSON.parse(xhr.responseText);
  //   // cardData = JSON.parse(xhr.responseText);
  //   renderCards(JSON.parse(xhr.responseText));
  //   // data now contains the array from PHP
  //   // const cardData = data;
  // }

//login.js
      // http://localhost/OASD/login.html?username=ivan&password=321
    // 发送 AJAX 请求到后端 PHP 脚本
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "../../php/login.php", false);//使用同步
    // // xhr.open("POST", "./php/login.php", true); //使用异步
    // // xhr.open("POST", "/OASD/php/login.php", true); //使用异步
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.send("username=" + username + "&password=" + password);
    // // xhr.send();
    // // 检查登录结果
    // xhr.onload = function () {
    //     if (xhr.responseText === "success") {
    //         let username = document.getElementById("username").value;
    //         let password = document.getElementById("password").value;
    //         // 将它们保存到 localStorage
    //         localStorage.setItem("username", username);
    //         localStorage.setItem("password", password);
    //         // alert("Login successful!");
    //         // 显示登录成功的提示框
    //         var successBox = document.getElementById("success-box");
    //         successBox.style.display = "block";
    //         setTimeout(function () {
    //             successBox.style.display = "none";
    //         }, 3000);
    //         // window.location.href = "./index.html"; 
    //         // 将用户重定向到主页
    //         location.href = "./index.html";
    //         //2s jump
    //         setTimeout(function () {
    //             // window.location.href = "./index.html";
    //         }, 2000);
    //         // window.location.href = "./index.html";
    //         // .代表当前目录
    //         return true;
    //     } else {
    //         // 显示登录失败的提示框
    //         var errorBox = document.getElementById("error-box");
    //         errorBox.style.display = "block";
    //         // alert("Login failed. Please check your username and password.");
    //         location.href = "./login.html";
    //         //2s jump
    //         setTimeout(function () {
    //             window.location.href = "./login.html";
    //         }, 2000);
    //         // window.location.href = "./login.html"; // 将用户重定向到登录
    //         return false;
    //     }
    // }
    
    
    //card.js
// data.forEach(function(item) {
//   var card = document.createElement('div');
//   card.classList.add('card');

//   var title = document.createElement('h3');
//   title.textContent = item.Title;

//   var img = document.createElement('img');
//   img.src = item.ImageFileName;

//   card.appendChild(title);
//   card.appendChild(img);

//   cards.appendChild(card);
// })

// 卡片数据，可以根据需要进行修改
// const cardData = [
//   {
//     title: "Product 1",
//     description: "Product 1 description",
//     price: "$499.49",
//   },
//   {
//     title: "Product 2",
//     description: "Product 2 description",
//     price: "$599.49",
//   },
//   // 其他卡片数据
// ];