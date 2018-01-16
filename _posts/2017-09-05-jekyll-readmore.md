---
layout: post
title: "jekyll 摘要实现"
date: 2017-09-05 14:00:01 +0800
lastmod: 2017-09-10 18:10:30 +0800
categories:
  - it
tags:
  - jekyll
  - readmore
---

目前，可以实现 jekyll 摘要功能的方法主要有三种。 
 
# 方法介绍
## Liquid Markup  
在 _post/*.md 内容中加入标签 ![图片加载中......]({{ BASE_PATH }}/assets/images/posts/jekyll_more.png)，在首页内容中通过
![图片加载中......]({{ BASE_PATH }}/assets/images/posts/jekyll_split_more.png)  
标记显示摘要内容，不过经我试验，这种方法容易在 ReadMore 链接后多出一个 `</div>`。
  
## Custom Plugin  
在 _plugins 中编写 ruby 脚本实现摘要功能。在此不做介绍，如果有兴趣，可以查看本文末尾的参考资料。  
<!-- more -->

## Jekyll ReadMore  
通过在网上搜索，发现 jekyll 官方就支持摘要功能，在 _config.yml 里指定摘要的分隔符 ![图片加载中......]({{ BASE_PATH }}/assets/images/posts/jekyll_excerpt_more.png)  在 _post/*.md 内容中加入标签 ![图片加载中......]({{ BASE_PATH }}/assets/images/posts/jekyll_more.png)，在首页内容中通过 `{% raw %}{{ post.excerpt }}{% endraw %}` 标记显示摘要内容。  
以上几种方法中，推荐使用第 3 种。

# 参考资料  
- [jekyll-readmore](http://www.cnblogs.com/coderzh/p/jekyll-readmore.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
- [maintaning-read-more-links-when-moving-from-drupal-to-jekyll](http://danishmujeeb.com/blog/2012/07/maintaning-read-more-links-when-moving-from-drupal-to-jekyll/){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
