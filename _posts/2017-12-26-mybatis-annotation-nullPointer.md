---
layout: post
title: MyBatis 注解引发空指针异常
date: 2017-12-26 9:55:25 +0800
lastmod: 2017-12-26 9:55:25 +0800
category : it
tagline: "Supporting tagline"
tags : [MyBatis,annotation,nullPointer]
---
# MyBatis 注解引发空指针异常
---
#### 1. 数据库表字段含有下划线
```
filed_name
```

#### 2. Java 对象属性使用驼峰命名规则
```
filedName
```

#### 3. MyBatis 注解（错误）
```
@Select("select filed_name from table_name")
```

#### 4. MyBatis 注解（正确）
```
@Select("select filed_name as filedName from table_name")
```
