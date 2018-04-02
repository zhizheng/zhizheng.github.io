---
layout: post
title: "Redis 集群搭建"
date: 2018-04-02 18:05:01 +0800
categories:
  - Redis
tags:
  - cluster
---

## 源码下载

[http://download.redis.io/releases/redis-3.2.11.tar.gz](http://download.redis.io/releases/redis-3.2.11.tar.gz){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## 源码编译

```shell
cd ~/redis-3.2.11
make
```

## 集群规划

创建集群目录，将编译好的命令文件复制到 bin 目录

```shell
mkdir -p /usr/local/redis-cluster/bin
cd ~/redis-3.2.11/src
cp mkreleasehdr.sh redis-benchmark redis-check-aof redis-check-dump redis-cli redis-server redis-trib.rb /usr/local/redis-cluster/bin
```

<!-- more -->

创建 6 个 redis 实例目录，并将 redis 配置文件复制到各实例目录

```shell
cd /usr/local/redis-cluster

mkdir -p 9001/data
mkdir -p 9002/data
mkdir -p 9003/data
mkdir -p 9004/data
mkdir -p 9005/data
mkdir -p 9006/data

cp ~/redis-3.2.11/redis.conf 9001
cp ~/redis-3.2.11/redis.conf 9002
cp ~/redis-3.2.11/redis.conf 9003
cp ~/redis-3.2.11/redis.conf 9004
cp ~/redis-3.2.11/redis.conf 9005
cp ~/redis-3.2.11/redis.conf 9006
```

修改各 redis 实例的配置文件，以 9001 实例为例，bind 为本机 ip

```
daemonize yes
pidfile /usr/local/redis-cluster/9001/redis.pid
bind 192.168.1.6
port 9001
dir /usr/local/redis-cluster/9001/data
appendonly yes
cluster-enabled yes
cluster-config-file nodes-9001.conf
cluster-node-timeout 15000
```

9002-9006 实例配置同上，只是将其中的 9001 替换为相应的端口号。

## 实例测试

启动实例

```shell
/usr/local/redis-cluster/bin/redis-server /usr/local/redis-cluster/9001/redis.conf
/usr/local/redis-cluster/bin/redis-server /usr/local/redis-cluster/9002/redis.conf
/usr/local/redis-cluster/bin/redis-server /usr/local/redis-cluster/9003/redis.conf
/usr/local/redis-cluster/bin/redis-server /usr/local/redis-cluster/9004/redis.conf
/usr/local/redis-cluster/bin/redis-server /usr/local/redis-cluster/9005/redis.conf
/usr/local/redis-cluster/bin/redis-server /usr/local/redis-cluster/9006/redis.conf
```

连接实例，确认各实例正常启动

```shell
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9001
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9002
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9003
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9004
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9005
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9006
```

## 构建集群

安装 ruby 及 redis 依赖

```shell
apt-get install ruby
gem install redis
```

将单独的 redis 实例构建成集群（三主三从）

```shell
/usr/local/redis-cluster/bin/redis-trib.rb create --replicas 1 192.168.1.6:9001 192.168.1.6:9002 192.168.1.6:9003 192.168.1.6:9004 192.168.1.6:9005 192.168.1.6:9006
```

连接集群节点，注意比连接单实例时多了一个 -c 参数

```shell
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9001 -c
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9002 -c
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9003 -c
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9004 -c
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9005 -c
/usr/local/redis-cluster/bin/redis-cli -h 192.168.1.6 -p 9006 -c
```

查看集群信息

```shell
$ ./redis-cli -h 192.168.1.6 -p 9001 -c
192.168.1.6:9001> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_sent:55
cluster_stats_messages_received:50
192.168.1.6:9001> cluster nodes
e74db54eb4fa9dde324988e44bb3919129f944c8 192.168.1.6:9006 slave de0928f00ac377bf5b7806d088808f31804923eb 0 1522674425815 6 connected
186a18ae13203946253b537cfdab549b3be5282d 192.168.1.6:9005 slave 761269f61d3f95d3937b5b3451ea73f979aa40e6 0 1522674423811 5 connected
3e58b504f1419cf770313daf11f480bf48dd34a0 192.168.1.6:9001 myself,master - 0 0 1 connected 0-5460
6a1327d2385b0e270a9d1fa63bae3c14c879625e 192.168.1.6:9004 slave 3e58b504f1419cf770313daf11f480bf48dd34a0 0 1522674424813 4 connected
761269f61d3f95d3937b5b3451ea73f979aa40e6 192.168.1.6:9002 master - 0 1522674422809 2 connected 5461-10922
de0928f00ac377bf5b7806d088808f31804923eb 192.168.1.6:9003 master - 0 1522674426818 3 connected 10923-16383
```

存储数据（存储位置通过 key 计算出来，算法 CRC16('key1')%16384）
```shell
$ ./redis-cli -h 192.168.1.6 -p 9001 -c
192.168.1.6:9001> set key1 value1
-> Redirected to slot [9189] located at 192.168.1.6:9002
OK
192.168.1.6:9002>
```

## 参考资料

- [Redis 集群搭建详细指南](http://www.cnblogs.com/mafly/p/redis_cluster.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

