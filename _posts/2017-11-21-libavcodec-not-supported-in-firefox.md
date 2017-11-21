---
layout: post
title: Firefox 提示 libavcodec 过时
date: 2017-11-21 15:39:25 +0800
lastmod: 2017-11-21 15:39:25 +0800
category : it
tagline: "Supporting tagline"
tags : [libavcodec,firefox]
---
# Firefox 提示 libavcodec 过时
---
libavcodec may be vulnerable or is not supported, and should be updated to play video

#### 0. 环境说明  
操作系统：Debian 7 "Wheezy"(64-bit)，Firefox:57.0 (64-bit)，FFmpeg:3.4

#### 1. 方法一：下载最新版 FFmpeg 源码，编译安装
```
./configure --prefix=/usr/local/ffmpeg ...
make
make install

vi /etc/ld.so.conf
# 添加一行
# /usr/local/ffmpeg/lib
ldconfig
```
#### 2. 方法二：修改 Firefox 参数
在地址栏中输入 about:config，将 media.libavcodec.allow-obsolete 的值由 false 修改为 true，重启浏览器。

#### 3. 方法三：安装 backports 源 libavcodec
系统原来带的是 libavcodec 53(53.35.0)，现在安装 libavcodec 55(55.34.1)
```
apt-get install -t wheezy-backports libavcodec55
```

#### 4. 结果  
方法一不生效，方法二生效，方法三生效。

#### 参考资料
[Firefox —  Notes (50.0) Blocked versions of libavcodec older than 54.35.1](https://www.mozilla.org/en-US/firefox/50.0/releasenotes/){:target="_blank"}{:rel="nofollow noopener noreferrer"}

