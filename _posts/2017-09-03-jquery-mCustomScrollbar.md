---
layout: post
title: jQuery 滚动条插件
date: 2017-09-03 10:24:58 +0800
lastmod: 2017-09-10 18:10:30 +0800
category : it
tagline: "Supporting tagline"
tags : [jQuery,scrollbar,plugin]
---
# jQuery 滚动条插件
---
当页面出现滚动条时，页面内容会向左发生偏移，mCustomScrollbar 插件可以解决这个问题。

## 一、安装使用
#### 1. 下载插件  
[https://github.com/malihu/malihu-custom-scrollbar-plugin/releases](https://github.com/malihu/malihu-custom-scrollbar-plugin/releases){:target="_blank"}{:rel="nofollow noopener noreferrer"}

#### 2. 在页面引入相关资源  
```
<link href="css/jquery.mCustomScrollbar.min.css" rel="stylesheet">
<style>
    html, body{ height: 100%; }
</style>
<script src="js/jquery.min.js"></script>
<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
```
<!-- more -->

#### 3. 插件初始化
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

## 二、缺点
- 从无滚动条页面跳转到有滚动条页面会发生闪动现象。具体表现为首先出现浏览器的原生滚动条再快速地切换到插件的浮动滚动条，虽然一般情况下切换很快，但是闪烁现象不容忽视；
- 移动端表现不佳。在 PC 机上，通过调整插件参数，在 firefox 中滚动速度达到可以接受的程序。在 Android 机上，拖动速度比正常速度感觉慢了很多，有迟滞。 

## 三、参考资料
- [jquery-custom-content-scroller](http://manos.malihu.gr/jquery-custom-content-scroller/){:target="_blank"}{:rel="nofollow noopener noreferrer"}
