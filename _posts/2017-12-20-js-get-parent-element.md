---
layout: post
title: js 获取父窗口中的元素
date: 2017-12-20 10:29:25 +0800
lastmod: 2017-12-20 10:29:25 +0800
category : it
tagline: "Supporting tagline"
tags : [js,jQuery,parent]
---
# js 获取父窗口中的元素
---
#### 1. 通过原生 js 获取
```
window.parent.document.getElementById('elementId')
```

#### 2. 通过 jQuery 获取
```
$('#elementId', window.parent.document)
```

#### 3. 参考资料
- [How to get parent window element in jquery and JavaScript](https://jainishsenjaliya.wordpress.com/2012/12/13/how-to-get-parent-window-element-in-jquery-and-javascript/){:target="_blank"}{:rel="nofollow noopener noreferrer"} 
