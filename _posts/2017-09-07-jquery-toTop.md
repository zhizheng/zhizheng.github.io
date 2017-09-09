---
layout: post
title: jQuery 返回顶部插件
date: 2017-09-07 11:40:01 +0800
lastmod: 2017-09-10 04:15:30 +0800
category : it
tagline: "Supporting tagline"
tags : [jQuery,top]
---
{% include JB/setup %}
# jQuery 返回顶部插件
---
1.下载插件  
[https://github.com/mmkjony/jQuery.toTop](https://github.com/mmkjony/jQuery.toTop){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
2.在页面引入相关资源  
```
<script src="js/jquery.min.js"></script>
<script src="js/jquery.toTop.min.js"></script>
```
3.在页面中添加返回顶部按钮  
```
<a class="to-top">Top</a>
```
4.插件初始化  
```
$('.to-top').toTop();
```
<!-- more -->
参考资料：[jQuery.toTop](https://github.com/mmkjony/jQuery.toTop/blob/master/README.md){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
