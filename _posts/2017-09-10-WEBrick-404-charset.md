---
layout: post
title: "WEBrick 404 charset"
date: 2017-09-10 16:52:01 +0800
categories:
  - it
tags:
  - jekyll
  - WEBrick
  - "404"
  - charset
---

WEBrick 遇到 404 错误时，返回错误编码。 

## 问题分析
### WEBrick 版本  
WEBrick/1.3.1 (Ruby/2.2.6) 
 
### WEBrick 返回信息  
Content-Type: text/html; charset=ISO-8859-1, text/html; charset=UTF-8

第一个 `charset=ISO-8859-1` 是 WEBrick 返回的，  第二个 `charset=UTF-8` 是 404 页面返回的。  

### 引发问题的 WEBrick 相关代码  
文件 \<Ruby Home\>\lib\ruby\2.2.0\webrick\httpresponse.rb  
```ruby
def set_error(ex, backtrace=false)
      case ex
      when HTTPStatus::Status
        @keep_alive = false if HTTPStatus::error?(ex.code)
        self.status = ex.code
      else
        @keep_alive = false
        self.status = HTTPStatus::RC_INTERNAL_SERVER_ERROR
      end
      @header['content-type'] = "text/html; charset=ISO-8859-1"
```
<!-- more -->

## 解决方法
### 本地环境  
将上面代码中的 `charset=ISO-8859-1` 修改为 `charset=UTF-8`，并重新运行 jekyll serve 命令。
 
### github pages  
github pages 是正常的，不清楚它做了什么处理。

## 参考资料
- [https://github.com/jekyll/jekyll/issues/2289](https://github.com/jekyll/jekyll/issues/2289){:target="_blank"}{:rel="nofollow noopener noreferrer"}
