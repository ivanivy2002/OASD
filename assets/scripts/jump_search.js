// 获取 submit 按钮的 DOM 元素
const submitBtn = document.getElementById("search-btn");

// 给 submit 按钮添加点击事件监听器
submitBtn.addEventListener("click", function (event) {
    event.preventDefault()
  // 获取输入框的值
//   const searchQuery = document.querySelector(".form-control").value;

  // 构造跳转链接
//   const searchUrl = "search.html?q=" + encodeURIComponent(searchQuery);

  // 跳转到 search.html 页面
//   window.location.href = searchUrl;
    
  window.location.href = "search.html";
});