---
layout: post
title: Linux SSH 免密
date: 2017-11-29 15:37:25 +0800
lastmod: 2017-11-29 15:37:25 +0800
category : it
tagline: "Supporting tagline"
tags : [linux,ssh]
---
# Linux SSH 免密
---
#### 1. 规划设定
- 服务器：server1 server2 server3，其中 server1 是部署机，server2 server3 是目标机
- 目标：服务器 server1 免密登录 server1 server2 server3（server1 免密登录 server1 是将 server1 也当成一个目标机使用）
- 假定：所有主机使用用户名为 user

#### 2. 免密设置
```
# 在 server1 上生成公钥和私钥，下面演示使用 dsa 加密算法，还有 rsa 等加密算法，具体使用哪种请综合安全性等自行选择
user@server1:~$ ssh-keygen -t dsa
user@server1:~$ ls ~/.ssh
# id_dsa.pub # 公钥
# id_dsa     # 私钥

# server1 对 server1 免密
user@server1:~$ cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
user@server1:~$ chmod 600 ~/.ssh/authorized_keys
user@server1:~$ chmod 700 ~/.ssh

# server2 对 server1 免密
user@server1:~$ scp ~/.ssh/id_dsa.pub user@server2:/home/user/.ssh
user@server1:~$ ssh user@server2
user@server2:~$ cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
user@server2:~$ chmod 600 ~/.ssh/authorized_keys
user@server2:~$ chmod 700 ~/.ssh

# server3 对 server1 免密
user@server1:~$ scp ~/.ssh/id_dsa.pub user@server3:/home/user/.ssh
user@server1:~$ ssh user@server3
user@server3:~$ cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
user@server3:~$ chmod 600 ~/.ssh/authorized_keys
user@server3:~$ chmod 700 ~/.ssh

# 在 server1 上测试免密效果，以下直接登录，无需密码
user@server1:~$ ssh user@server1
user@server1:~$ ssh user@server2
user@server1:~$ ssh user@server3
```
<!-- more -->

#### 3. 参考资料
- [Linux/UNIX下使用ssh-keygen设置SSH无密码登录](http://blog.csdn.net/leexide/article/details/17252369){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
- [SSH 密钥类型的的选择（RSA， DSA or Other）](http://blog.sina.com.cn/s/blog_6f31085901015agu.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
