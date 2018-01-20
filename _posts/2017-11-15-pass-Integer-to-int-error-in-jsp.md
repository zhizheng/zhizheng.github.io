---
layout: post
title: "jsp 文件里 Integer 转 int 异常"
date: 2017-11-15 23:25:25 +0800
categories:
  - it
tags:
  - jsp
  - int
  - Integer
---

<font color="red">20171116 更新：Integer 和 int 是自动类型转化的，昨天的问题（int id = user.getId(); 异常）应该是 user 成员变量 id 没有初始化（如 User user = new User();）引起的。</font>

## Java 类 User.java
```java
package org.izhizheng.bean;

public class User {

	private Integer id;
	private String name;

	public User() {
		super();
	}

	public User(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setNId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
```
<!-- more -->

## jsp 文件 index.jsp
``` html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="org.izhizheng.bean.User" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	User user = new User(1, "tom");

	// 本机调试正常，服务器上运行异常
	// int id = user.getId();
	// 本机调试正常，服务器上运行正常
	int id2 = user.getId().intValue();
	// 本机调试正常，服务器上运行正常
	Integer id3 = user.getId();
	// 本机调试正常，服务器上运行正常
	Integer id4 = new Integer(user.getId().intValue());
	
	out.print("id2=" + id2 + "<br>");
	out.print("id3=" + id3 + "<br>");
	out.print("id4=" + id4 + "<br>");
%>
</body>
</html>
```

## 运行结果
![图片加载中......]({{ site.baseurl }}/uploads/pass-Integer-to-int-error-in-jsp_result.png)