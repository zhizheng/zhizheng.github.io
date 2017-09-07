---
layout: post
title: jQuery 滚动条插件
date: 2017-09-03 10:24:58 +0800
category : it
tagline: "Supporting tagline"
tags : [jQuery,scrollbar,plugin]
---
{% include JB/setup %}
# jQuery 滚动条插件
---
当页面出现滚动条时，页面内容会向左发生偏移，jquery mCustomScrollbar 插件解决了这个问题，

1.下载插件  
[https://github.com/malihu/malihu-custom-scrollbar-plugin/releases](https://github.com/malihu/malihu-custom-scrollbar-plugin/releases){:target="_blank"}{:rel="nofollow noopener noreferrer"}

2.在页面引入相关资源  
```
<link href="css/jquery.mCustomScrollbar.min.css" rel="stylesheet">
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
```
<!-- more -->
3.插件初始化  
在 head 元素中添加
```
<style>
    html, body{ height: 100%; }
</style>
```
或在 css 文件中添加
```
html, body{ height: 100%; }
```
在 body 元素中添加如下脚本
```
<script>
    (function($){
        $(window).on("load",function(){
            $("body").mCustomScrollbar({
                autoHideScrollbar:true
            });
        });
    })(jQuery);
</script>
```

参考资料：[jquery-custom-content-scroller](http://manos.malihu.gr/jquery-custom-content-scroller/){:target="_blank"}{:rel="nofollow noopener noreferrer"}
