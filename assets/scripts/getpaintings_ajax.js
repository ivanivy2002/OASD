$.ajax({
    url: './php/getpaintings.php', // 请求的 PHP 文件 
    dataType: 'json',  // 指定返回的数据类型为 JSON
    success: function (data) {
        // data 就是 PHP返回的JSON数据
        console.log(data);
    }
});