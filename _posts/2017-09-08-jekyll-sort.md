---
layout: post
title: "Jekyll sort"
date: 2017-09-08 23:35:01 +0800
categories:
  - Jekyll
tags:
  - sort
---

## 导航排序

### 在页面头信息中添加自定义属性 index  

```
---
layout: page
title: 分类
group: navigation
index: 2
---
```

### 排序导航菜单并输出链接

```html
{% raw %}{% assign sorted_pages = site.pages | sort:"index" %}
{% for node in sorted_pages %}
    <a href="{{ BASE_PATH }}{{node.url}}">{{node.title}}</a>
{% endfor %}{% endraw %}
```
<!-- more -->

## 参考资料

- [jekyll-post-order](http://stackoverflow.com/questions/26196559/jekyll-post-order){:target="_blank"}{:rel="nofollow noopener noreferrer"}
