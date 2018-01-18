---
layout: post
title: "本地调试 jekyll 主题时报 Could not open library 'libcurl.dll'"
date: 2018-01-18 12:23:01 +0800
categories:
  - it
tags:
  - jekyll 
  - theme
  - next
  - windows
  - libcurl.dll
---

Windows 本地调试 jekyll-theme-next 主题时

```
bundle exec jekyll server
```

报以下错误

> Dependency Error: Yikes! It looks like you don't have jekyll-remote-theme or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'Could not open library 'libcurl': �Ҳ���ָ����ģ�顣 . Could not open library 'libcurl.dll': �Ҳ���ָ����ģ�顣 . Could not open library 'libcurl.so.4': �Ҳ���ָ����ģ�顣 . Could not open library 'libcurl.so.4.dll': �Ҳ���ָ����ģ�顣 ' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!

经网上查询并亲自试验，发现有两种方法解决这个问题。

<!-- more -->

# 解决方法

## 方法一：修改主题配置文件

### 修改 Gemfile

修改前内容

```
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
#gem 'jekyll-admin', group: :jekyll_plugins
```

修改后内容

```
source 'https://rubygems.org'
gem 'github-pages'
#gem 'jekyll-admin', group: :jekyll_plugins
```

### 修改 _config.yml

在 plugins 下添加 jekyll-paginate，修改前内容

```
plugins:
# jemoji conficts with toc in some no-ascii post
# - jemoji
 - jekyll-sitemap
 - jekyll-feed
```

修改后内容

```
plugins:
# jemoji conficts with toc in some no-ascii post
# - jemoji
 - jekyll-sitemap
 - jekyll-feed
 - jekyll-paginate
```

## 方法二：在操作系统中安装 libcurl.dll

可以直接从网上下载 libcurl.dll 放到系统 path 下，或者下载 curl 源码自己编译。

### 下载 libcurl.dll 二进制包

打开网页 https://curl.haxx.se/gknw.net/7.40.0/dist-w64/，并选择一个包下载，如 [curl-7.40.0-ssh2-ssl-sspi-zlib-static-bin-w64.zip](https://curl.haxx.se/gknw.net/7.40.0/dist-w64/curl-7.40.0-ssh2-ssl-sspi-zlib-static-bin-w64.zip){:target="_blank"}{:rel="nofollow noopener noreferrer"}，解压后将目录中的 libcurl.dll 放到系统 path 下，如 Ruby 安装目录 bin 中。

### 下载 curl 源码编译

打开网页 https://curl.haxx.se/download.html，并选择一个源码包下载，如 [curl-7.57.0.zip](https://curl.haxx.se/download/curl-7.57.0.zip){:target="_blank"}{:rel="nofollow noopener noreferrer"}，解压包到 C:\curl-7.57.0，在终端（CMD 或 Powershell）下，切换到本机 DevKit目录，运行 msys.bat，此时会弹出一个 mingw 环境窗口，在 mingw 环境窗口中输入命令 `cd /c/curl-7.57.0/lib` 进入到 C:\curl-7.57.0\lib 目录，然后执行 `make -f Makefile.m32` 编译源码，编译完成后会在 lib 目录下会生成 libcurl.dll，将 libcurl.dll 放到系统 path 下，如 Ruby 安装目录 bin 中。



# 方法优劣比较

## 方法一

### 优点

可以比较快速地进入本地调试步骤，而不用修改操作系统。

### 缺点

如果远方仓库（如 github）中 Gemfile 和 _config.yml plugins 部分保持主题默认的话，本地调试完成后提交时有可能误将这两部分误提交。

## 方法二

### 优点

操作系统安装 libcurl.dll 后，本地 Gemfile 和 _config.yml plugins 部分可以与远方仓库（如 github）保持一致，不用做任何修改。

### 缺点

要修改操作系统，比较麻烦，还有可能给系统带来安全性的问题。

# 参考资料

- [jekyll serve dependency error - Could not open 'lib curl'](https://stackoverflow.com/questions/47720302/jekyll-serve-dependency-error-could-not-open-lib-curl){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [Ruby 在 windows xp 成功编译 gem typhoeus 的步骤](https://ruby-china.org/topics/1084){:target="_blank"}{:rel="nofollow noopener noreferrer"}
