---
layout: post
title: "Bootstrap 2 响应式导航"
date: 2017-09-12 14:35:15 +0800
categories:
  - Bootstrap
tags:
  - navbar
  - responsive
---

本文针对的是 Bootstrap 2，Bootstrap 3 响应式导航请自行搜索。

## 使用方法

### 在页面中加入依赖的文件

```html
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap-collapse.js"></script>
```

### 导航示例代码

```html
<div class="navbar">
  <div class="navbar-inner">
    <div class="container">
 
      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
 
      <!-- Be sure to leave the brand out there if you want it shown -->
      <a class="brand" href="#">Project name</a>
 
      <!-- Everything you want hidden at 940px or less, place within here -->
      <div class="nav-collapse collapse">
        <!-- .nav, .navbar-search, .navbar-form, etc -->
      </div>
 
    </div>
  </div>
</div>
```
<!-- more -->

## 参考资料

- [响应式导航条](http://v2.bootcss.com/components.html#navbar){:target="_blank"}{:rel="nofollow noopener noreferrer"}
