---
layout: post
title: "Linux su 命令"
date: 2018-02-02 17:54:01 +0800
categories:
  - Linux
tags:
  - command
  - su
---

今天一个同事问了我一个 linux 相关的问题，在服务器上用 root 用户执行如下命令

```
cd /elasticsearch/elasticsearch-2.3.2/bin && su elasticsearch && ./elasticsearch -d
```

> 好像执行./elasticsearch -d时，还是在root用户

根据他说的情况，我想到 su 是有命令参数的，根据他的命令，我修改了一下

```
su - elasticsearch  -c "cd /elasticsearch/elasticsearch-2.3.2/bin && ./elasticsearch -d"
```

发给他后，他在自己的环境执行后，结果确实成功了。

## 参考资料

- [shell不能执行su 后的脚本](http://blog.csdn.net/linucle/article/details/43967237){:target="_blank"}{:rel="nofollow noopener noreferrer"}
