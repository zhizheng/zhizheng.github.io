---
layout: post
title: jekyll baseurl
date: 2017-09-06 01:00:01 +0800
lastmod: 2017-09-10 18:10:30 +0800
category : it
tagline: "Supporting tagline"
tags : [jekyll,baseurl]
---
# jekyll baseurl
---
如果你的 jekyll 网站放在域名的某个目录下，则可以在 _config.yml 中配置 `baseurl` 参数，如 `baseurl: /blog`，则网站的访问地址类似 `http://127.0.0.1:4000/blog/`，同时要注意模板中 url 拼装问题。
