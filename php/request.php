<?php
/*
 * @Author: ZMark
 * @Date: 2023-05-25 22:57:24
 * @LastEditors: ZMark
 * @LastEditTime: 2023-05-31 16:52:09
 * @FilePath: \Artistic-Realm\ar-rear\common\request.php
 * @Description: 处理请求相关的公共方法
 * 
 * Copyright (c) 2023 by ZMark, All Rights Reserved. 
 */

//返回body参数
function getObjectFromBody()
{
    $jsonData = file_get_contents('php://input');  // 获取原始的 body 数据
    $data = json_decode($jsonData);  // 解码为 PHP 对象
    return $data;
}
