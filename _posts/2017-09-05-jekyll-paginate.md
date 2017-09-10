---
layout: post
title: jekyll 分页实现
date: 2017-09-05 16:10:01 +0800
lastmod: 2017-09-10 18:10:30 +0800
category : it
tagline: "Supporting tagline"
tags : [jekyll,paginate]
---
{% include JB/setup %}
# jekyll 分页实现
---
## 一、实现方法
#### 1. 配置 _config.yml  
```
paginate: 5
paginate_path: "index:num/"
......
plugins:
  - jekyll-paginate
```
其中，第一页为“/”，第二页以后为“index2/”、“index3/”......  
<!-- more -->

#### 2. 修改分页页面  
原来读取文章内容使用
```
{% raw %}{% for post in site.posts %}
<div class="card">
	<div class="date_label">
		<div class="day_month">
			{{ post.date | date:"%m/%d" }}
		</div>
		<div class="year">
			{{ post.date | date:"%Y" }}
		</div>
	</div>
	{{ post.excerpt }}
	<div class="read_more">
		<a class="fa fa-link" href="{{ BASE_PATH }}{{ post.url }}" rel="bookmark">查看全文&hellip;</a>
	</div>
</div>
{% endfor %}{% endraw %}
```
现修改为
```
{% raw %}<!-- This loops through the paginated posts -->
{% for post in paginator.posts %}
  <div class="card">
	<div class="date_label">
		<div class="day_month">
			{{ post.date | date:"%m/%d" }}
		</div>
		<div class="year">
			{{ post.date | date:"%Y" }}
		</div>
	</div>
	{{ post.excerpt }}
	<div class="read_more">
		<a class="fa fa-link" href="{{ BASE_PATH }}{{ post.url }}" rel="bookmark">查看全文&hellip;</a>
	</div>
</div>
{% endfor %}

<!-- Pagination links -->
<div class="pagination">
	<div class="left">
	  {% if paginator.previous_page %}
		<a href="/" class="first">首页</a>
		<a href="{{ paginator.previous_page_path }}" class="previous">前一页</a>
	  {% else %}
		<span class="first">首页</span>
		<span class="previous">前一页</span>
	  {% endif %}
	</div>
	<div class="middle">
	  <span class="page_number ">第 {{ paginator.page }} 页/共 {{ paginator.total_pages }} 页</span>
	</div>
	<div class="right">
	  {% if paginator.next_page %}
		<a href="{{ paginator.next_page_path }}" class="next">后一页</a>
		<a href="/{{site.paginate_path | split:':' | first }}{{ paginator.total_pages }}/" class="last">尾页</a>
	  {% else %}
		<span class="next ">后一页</span>
		<span class="last ">尾页</span>
	  {% endif %}
	</div>
</div>{% endraw %}
```

#### 3. css
```
.pagination .left {
	width: 100px;
	float: left;
	text-align: left;
}

.pagination .middle {
	position: absolute;
	left: 100px;
	right: 100px;
	text-align: center;
	z-index: -1;
}

.pagination .right {
	width: 100px;
	float: right;
	text-align: right;
}

.pagination .previous {
	margin-left: 10px;
}

.pagination .next {
	margin-right: 10px;
}
```

## 参考资料
- [jekyll-liquid-syntax-documentation](https://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/#pagination){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
