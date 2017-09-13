---
layout: post
title: Chrome 中 span 无法撑开 a
date: 2017-09-14 01:38:36 +0800
lastmod: 2017-09-14 01:38:36 +0800
category : it
tagline: "Supporting tagline"
tags : [chrome,a,span]
---
# Chrome 中 span 无法撑开 a
---
在 blog 正文下面添加上一篇和下一篇按钮，遇到浏览器兼容问题。

## 一、问题描述
代码
```
{% raw %}<div class="pagination clearfix">
  <ul class="pull-right">
  {% if page.previous %}
    <li class="prev"><a class="fa fa-arrow-circle-left" href="{{ BASE_PATH }}{{ page.previous.url }}" title="{{ page.previous.title }}">前一篇</a></li>
  {% else %}
    <li class="prev disabled"><a class="fa fa-arrow-circle-left">前一篇</a></li>
  {% endif %}
    <li><a class="fa fa-th" href="{{ BASE_PATH }}{{ site.JB.archive_path }}">所有文档</a></li>
  {% if page.next %}
    <li class="next"><a class="fa fa-arrow-circle-right-after" href="{{ BASE_PATH }}{{ page.next.url }}" title="{{ page.next.title }}">后一篇</a></li>
  {% else %}
    <li class="next disabled"><a class="fa fa-arrow-circle-right-after">后一篇</a>
  {% endif %}
  </ul>
</div>{% endraw %}
```

期望结果  
![图片加载中......]({{ BASE_PATH }}/assets/images/posts/chrome_a_span_normal.png)  
<!-- more -->

经实验，在 Firefox 和 Edge 中达到预期效果，在 Chrome 中显示有问题（右侧缺失）  
![图片加载中......]({{ BASE_PATH }}/assets/images/posts/chrome_a_span_error.png)  

首先想到的解决方法是添加 css 样式  
```
.fa-arrow-circle-right {
    margin-right: 12px;
}
```

结果在 Chrome 中达到预期效果，在 Firefox 和 Edge 中显示有问题（右侧多出一部分）  
![图片加载中......]({{ BASE_PATH }}/assets/images/posts/chrome_a_span_error2.png)  

## 二、解决方法
#### 1. 添加 css 样式
```
.fa-arrow-circle-right-after:after {/* chrome 浏览器中 span 无法撑开 a */
  content: '\f0a9';
}
```
#### 2. 修改代码
```
{% raw %}<div class="pagination clearfix">
  <ul class="pull-right">
  {% if page.previous %}
    <li class="prev"><a class="fa fa-arrow-circle-left" href="{{ BASE_PATH }}{{ page.previous.url }}" title="{{ page.previous.title }}">前一篇</a></li>
  {% else %}
    <li class="prev disabled"><a class="fa fa-arrow-circle-left">前一篇</a></li>
  {% endif %}
    <li><a class="fa fa-th" href="{{ BASE_PATH }}{{ site.JB.archive_path }}">所有文档</a></li>
  {% if page.next %}
    <li class="next"><a class="fa fa-arrow-circle-right-after" href="{{ BASE_PATH }}{{ page.next.url }}" title="{{ page.next.title }}">后一篇</a></li>
  {% else %}
    <li class="next disabled"><a class="fa fa-arrow-circle-right-after">后一篇</a>
  {% endif %}
  </ul>
</div>{% endraw %}
```