---
layout: post
title: "Linux 丢失或误删除 libc.so.6 的处理方法"
date: 2018-05-08 17:33:01 +0800
categories:
  - Linux
tags:
  - missing
  - libc.so.6
---

因为要编写 markdown 并生成 html，选择安装 Atom。先是下载了最新版 1.26.1，安装后运行提示主机上 gblic 过时。又下载了一个较旧的版本 1.12.7，安装后运行还是提示主机上 gblic 过时，需要 glibc-2.14。因此决定升级主机 glibc 版本。

<!-- more -->

## 环境说明

* 操作系统：Debian 7 (wheezy)
* glibc: glibc-2.13
* Atom: 1.26.1 & 1.12.7

## 升级 glibc 到新版本

1. 下载 [http://ftp.gnu.org/gnu/glibc/glibc-2.14.1.tar.gz](http://ftp.gnu.org/gnu/glibc/glibc-2.14.1.tar.gz){:target="_blank"}{:rel="nofollow noopener noreferrer"}
2. 编译

    ```shell
    cd /builds
    tar zxf /path/to/glibc-2.14.1.tar.gz
    cd /builds/glibc-2.14.1
    mkdir build
    cd build
    ../configure --prefix=/opt/glibc/2.14.1
    sudo apt-get install gawk # 解决 make 报错
    make -j4
    sudo make install
    ```

3. 修改系统链接指向新动态库

    ```shell
    cd /lib/x86_64-linux-gnu
    unlink libc.so.6
    ln -s /opt/glibc/2.14.1/lib/libc-2.14.1.so libc.so.6 # 命令报错，提示找不到 libc.so.6，其它好多系统内置命令也无法运行
    ```

## 找不到 libc.so.6 问题解决

1. 使用光盘修复系统
2. 执行以下命令

    ```
    LD_PRELOAD=/lib/x86_64-linux-gnu/libc-2.13.so ln -s /opt/glibc/2.14.1/lib/libc-2.14.1.so libc.so.6
    ```

    或

    ```
    LD_PRELOAD=/opt/glibc/2.14.1/lib/libc-2.14.1.so ln -s /opt/glibc/2.14.1/lib/libc-2.14.1.so libc.so.6
    ```

推荐使用第 2 种方法。

## 参考资料

- [误删除libc.so.6的解决方法](http://www.cnblogs.com/qingchen1984/p/5731419.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

