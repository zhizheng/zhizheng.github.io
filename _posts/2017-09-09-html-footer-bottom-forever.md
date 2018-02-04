---
layout: post
title: "html 页脚永远保持在底部"
date: 2017-09-09 23:22:01 +0800
categories:
  - CSS
tags:
  - html
  - footer
  - bottom
---

当页面内容不足一屏时，页脚就会跑到屏幕中间去，体验效果不好。

## 解决方法

### html

```html
<body>
    <div class="header">
        页首
    </div>

    <div class="content">
        内容
    </div>

    <div class="footer">
        页脚
    </div>
</body>
```
<!-- more -->

### css

```css
html, body{ 
    height: 100%; 
    margin: 0;
    padding: 0;
}
body{ 
    position: relative;   /* 重要！保证footer是相对于body位置绝对 */  
    height: auto;         /* 保证页面能撑开浏览器高度时显示正常 */  
    min-height: 100% ;
}
.content {
    margin: 0 auto;
    min-height: 100%;
    padding-bottom: 100px; /* 重要！给footer预留的空间 */  
}
.footer {
    position: absolute;
    height: 100px;         /* footer的高度一定要是固定值 */  
    bottom: 0;
    width: 100%;
    clear: both;
}
```

## 参考资料
  
- [div+css简单实现固定底部](http://blog.sina.com.cn/s/blog_818a1e5b0100wlu6.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [如何将页脚固定在页面底部(多种方法实现)](http://www.jb51.net/web/76954.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
