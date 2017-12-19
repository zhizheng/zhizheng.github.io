---
layout: post
title: tomcat 降级导致 jsp 报错
date: 2017-12-19 10:25:25 +0800
lastmod: 2017-12-19 10:25:25 +0800
category : it
tagline: "Supporting tagline"
tags : [tomcat,jsp,work]
---
# tomcat 降级导致 jsp 报错
---
#### 1. 版本说明
原 tomcat 版本 7.0.82，新 tomcat 版本 7.0.52。

#### 2. 降级操作
采用覆盖安装方式。

#### 3. 报错信息
通过浏览器访问 tomcat 中部署的 web 程序 jsp 页面，报错信息如下：
```
java.lang.NoSuchMethodError: javax.servlet.jsp.tagext.TagInfo
```

#### 4. 解决方案
删除 work/Catalina/localhost/<web 程序名称> 目录后，刷新浏览器，页面访问正常。