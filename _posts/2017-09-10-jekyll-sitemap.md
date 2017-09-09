---
layout: post
title: jekyll sitemap
date: 2017-09-10 05:10:01 +0800
lastmod: 2017-09-10 05:10:01 +0800
category : it
tagline: "Supporting tagline"
tags : [jekyll,sitemap]
---
{% include JB/setup %}
# jekyll sitemap
---
示例文件 sitemap.xml
```
---
layout: null
title : Sitemap
---
{% raw %}<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for post in site.posts %}
    <url>
      <loc>{{site.production_url}}{{ post.url }}</loc>
      {% if post.lastmod == null %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
      {% endif %}
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  {% endfor %}
  {% for page in site.pages %}
    {% if page.sitemap != null and page.sitemap != empty %}
      <url>
        <loc>{{site.production_url}}{{ page.url }}</loc>
        <lastmod>{{ page.sitemap.lastmod | date_to_xmlschema }}</lastmod>
        <changefreq>{{ page.sitemap.changefreq }}</changefreq>
        <priority>{{ page.sitemap.priority }}</priority>
       </url>
    {% endif %}
  {% endfor %}
</urlset>{% endraw %}
```
<!-- more -->
参考资料：  
- [generating-a-sitemap-in-jekyll-without-a-plugin](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [https://en.wikipedia.org/wiki/Sitemaps](https://en.wikipedia.org/wiki/Sitemaps){:target="_blank"}{:rel="nofollow noopener noreferrer"}
