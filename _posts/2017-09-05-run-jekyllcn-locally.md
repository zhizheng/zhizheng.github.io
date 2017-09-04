---
layout: post
title: 本地运行 jekyllcn
category : it
tagline: "Supporting tagline"
tags : [jekyll,jekyllcn,windows]
---
{% include JB/setup %}
# 本地运行 jekyllcn
---
1.下载源码
```
git clone https://github.com/xcatliu/jekyllcn.git
```
2.安装依赖包
```
cd jekyllcn
bundle install
```
不要执行下面这条命令，我因为执行了这条命令，导致第 3 步启动一直报错，后来根据错误信息，删除了一些新版本的包，安装了旧版本（2016 最新），才启动不报错，如：删除 jekyll-feed 0.9.2，安装 0.8.0；删除 jekyll-redirect-from 0.12.1，安装 0.10.0 等......
```
gem update
```
<!--break-->
3.启动
```
bundle exec rake site:preview
```
上面这条命令启动不报错后，自动打开浏览器（http://localhost:4000），但浏览器一直处于加载状态，没有任何内容，我开始以为是依赖包或源码还有问题，后来执行以下命令成功了，网页（http://localhost:5000）可以正常访问，
```
cd site
bundle exec jekyll serve -P 5000
```
看来不是程序有问题，而是 4000 端口有问题，在系统命令窗口中，执行以下命令查看端口状态，
```
 netstat -ano
```
其中，4000 端口的状态为，
```
协议  本地地址          外部地址        状态           PID
TCP   127.0.0.1:4000    0.0.0.0:0       LISTENING      1234
```
可以看到，PID 为 1234 的进程占用了 4000 端口，在系统任务管理器中通过该 PID 查看进程信息，确认是程序 FoxitProtect.exe 占用了端口，直接杀死进程，再执行 3 中第一条命令就没问题了，同时可以正常访问 http://localhost:4000 了。  

彻底的解决方法是直接到福昕 PDF 阅读器安装目录删除 FoxitProtect.exe 或者在系统服务中禁用 Foxit Service 服务。