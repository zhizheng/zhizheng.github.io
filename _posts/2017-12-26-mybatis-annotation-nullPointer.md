---
layout: post
title: "MyBatis 注解引发空指针异常"
date: 2017-12-26 9:55:25 +0800
categories:
  - MyBatis
tags:
  - annotation
  - NullPointerException
---

## 数据库表字段含有下划线

```
field_name
```

## Java 对象属性使用驼峰命名规则

```
fieldName
```

## MyBatis 注解（错误）

```java
@Select("select field_name from table_name")
```

## MyBatis 注解（正确）

```java
@Select("select field_name as fieldName from table_name")
```
