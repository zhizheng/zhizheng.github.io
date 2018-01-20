---
layout: post
title: "tomcat 降级导致 jsp 报错"
date: 2017-12-19 10:25:25 +0800
categories:
  - it
tags:
  - tomcat
  - jsp
  - work
---

## 版本说明

原 tomcat 版本 7.0.82，新 tomcat 版本 7.0.52。

## 降级操作

采用覆盖安装方式。

## 报错信息

通过浏览器访问 tomcat 中部署的 web 程序 jsp 页面，报错信息如下：

> java.lang.NoSuchMethodError: javax.servlet.jsp.tagext.TagInfo

## 解决方案

删除 work/Catalina/localhost/&lt;web 程序名称&gt; 目录后，刷新浏览器，页面访问正常。