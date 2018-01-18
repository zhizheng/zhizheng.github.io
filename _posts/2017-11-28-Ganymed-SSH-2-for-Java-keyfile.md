---
layout: post
title: "Ganymed SSH-2 for Java 免密"
date: 2017-11-28 19:01:25 +0800
categories:
  - it
tags:
  - java
  - ssh
  - sftp
---

Ganymed SSH-2 for Java 是一个纯 Java 实现的 SHH2 库，使用它可以通过用户密码登录服务器，那么是否可以免密登录呢？答案是可以的，而且支持 SFTP。

# 环境说明  
java version: 1.7.0_79, Ganymed SSH-2: build251beta1

# 密码登录
```java
String ip = "192.168.1.201";
int port = 22;
String username = "root";
String password = "admin123";

Connection conn = new Connection(ip, port);
conn.connect();
boolean isAuthenticated = conn.authenticateWithPassword(username, password);
if (isAuthenticated){
    // 登录成功
} else {
    // 登录失败
}
```
<!-- more -->

# 免密登录
```java
String ip = "192.168.1.201";
int port = 22;
String username = "root";
File keyfile = new File("/root/.ssh/id_dsa"); // or "~/.ssh/id_rsa"
String keyfilePass = ""; // will be ignored if not needed

Connection conn = new Connection(ip, port);
conn.connect();
boolean isAuthenticated = conn.authenticateWithPublicKey(username, keyfile, keyfilePass);
if (isAuthenticated){
    // 登录成功
} else {
    // 登录失败
}
```


