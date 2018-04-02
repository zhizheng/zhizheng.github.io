---
layout: post
title: "Linux 用户密码过期"
date: 2018-04-02 21:21:01 +0800
categories:
  - Linux
tags:
  - password
  - expire
---

今天，在工作中遇到了 linux 用户密码过期的问题，使用 chage 命令可以设置用户账号和密码的有效期。

chage 命令用法如下

```shell
user@server:~$ chage -h
Usage: chage [options] LOGIN

Options:
  -d, --lastday LAST_DAY        set date of last password change to LAST_DAY
  -E, --expiredate EXPIRE_DATE  set account expiration date to EXPIRE_DATE
  -h, --help                    display this help message and exit
  -I, --inactive INACTIVE       set password inactive after expiration
                                to INACTIVE
  -l, --list                    show account aging information
  -m, --mindays MIN_DAYS        set minimum number of days before password
                                change to MIN_DAYS
  -M, --maxdays MAX_DAYS        set maximim number of days before password
                                change to MAX_DAYS
  -R, --root CHROOT_DIR         directory to chroot into
  -W, --warndays WARN_DAYS      set expiration warning days to WARN_DAYS
```

其中，-E 设置账号过期时间，-M 设置密码过期时间，-I 设置密码失效时间。

<!-- more -->

用户 user 查看自己账号和密码的有效期

```shell
user@server:~$ chage -l user
Last password change					: Nov 28, 2016
Password expires					: never
Password inactive					: never
Account expires						: never
Minimum number of days between password change		: -1
Maximum number of days between password change		: 99999
Number of days of warning before password expires	: 7
```

设置账号 user 的过期时间为 2018 年 12 月 31 日

```shell
root@server:~# chage -E "2018-12-31" user
```

设置账号 user 永不过期

```shell
root@server:~# chage -E -1 user
```

设置账号 user 立即过期

```shell
root@server:~# chage -E 0 user
```

设置账号 user 的密码在 MAX_DAYS=30 天后过期，此时必须先修改密码才能登录系统

```shell
root@server:~# chage -M 30 user
```

设置账号 user 的密码在 MAX_DAYS+3 天后失效，此时不能登录系统，只能求助于管理员

```shell
root@server:~# chage -I 3 user
```

## 参考资料

- [如何设置Linux普通用户密码永不过期](http://m.blog.itpub.net/15498/viewspace-2070548/){:target="_blank"}{:rel="nofollow noopener noreferrer"}

