---
layout: post
title: "Linux 端口转发（映射）"
date: 2018-04-14 17:24:01 +0800
categories:
  - Linux
tags:
  - Port
  - Forwarding
  - SecureCrt
  - Xshell
---

当内网集群只开放一台主机（一般称为跳板机或中转机）可以被外界访问时，我们在跳板机或中转机上可以通过 ssh 连接到其它内网主机。

但是，当我们要通过本地浏览器访问某台内网主机上的 web 程序（或通过数据库客户端访问某台内网主机上的数据库）时，要如何做呢？

一种可靠的方法是通过端口转发（映射），架构示意图如下：

<!-- more -->

![port-forwarding_arch.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_arch.png)

具体可以通过 SecureCrt 或 Xshell 实现，具体方法如下：

## SecureCrt

确定连接跳板机或中转机的端口（当使用安全网关程序登录时，端口是随机的），可以看出 port 是 3551

![port-forwarding_1.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_1.png)
![port-forwarding_2.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_2.png)

新建一个会话，ip 127.0.0.1，端口 3551，并将所有的端口转发（映射）都配置上

![port-forwarding_3.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_3.png)
![port-forwarding_4.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_4.png)
![port-forwarding_5.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_5.png)
![port-forwarding_6.png]({{ site.baseurl }}/uploads/2018/04/port-forwarding_6.png)

连接刚建立的会话，连接成功后，就可以通过本机访问 web 程序或数据库了

> http://127.0.0.106:8080/

> jdbc:mysql://127.0.0.15:3306?test

## Xshell

Xshell 操作和 SecureCrt 类似，不再赘述。

## 重要说明

跳板机或中转机连接关闭后，端口转发（映射）全部失效。

