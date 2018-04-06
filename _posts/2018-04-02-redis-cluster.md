---
layout: post
title: "Redis 集群搭建"
date: 2018-04-02 18:05:01 +0800
categories:
  - Redis
tags:
  - cluster
  - java
  - client
  - crc16
---

## 源码下载

[http://download.redis.io/releases/redis-3.2.11.tar.gz](http://download.redis.io/releases/redis-3.2.11.tar.gz){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## 源码编译

```shell
tar zxvf redis-3.2.11.tar.gz
cd ~/redis-3.2.11
make
```

## 集群规划及配置

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

## 实例启动及测试

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

## 集群构建及测试

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

从集群信息可以看出，9001 9004 分配的槽为 0-5460，9002 9005 分配的槽为 5461-10922，9003 9006 分配的槽为 10923-16383。

数据存储测试（数据存储的槽编号通过 key 计算出来，算法 CRC16('key-name') % 16384，java 实现代码见下一小节）
```shell
$ ./redis-cli -h 192.168.1.6 -p 9001 -c
192.168.1.6:9001> set key1 value1
-> Redirected to slot [9189] located at 192.168.1.6:9002
OK
192.168.1.6:9002>
```

## 客户端连接读写

客户端以 jedis 为例，当前版本

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.9.0</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

数据读写测试代码

```java
Set<HostAndPort> jedisClusterNodes = new HashSet<HostAndPort>();
// Jedis Cluster will attempt to discover cluster nodes automatically
jedisClusterNodes.add(new HostAndPort("192.168.1.6", 9001));
jedisClusterNodes.add(new HostAndPort("192.168.1.6", 9002));
jedisClusterNodes.add(new HostAndPort("192.168.1.6", 9003));
jedisClusterNodes.add(new HostAndPort("192.168.1.6", 9004));
jedisClusterNodes.add(new HostAndPort("192.168.1.6", 9005));
jedisClusterNodes.add(new HostAndPort("192.168.1.6", 9006));
JedisCluster jc = new JedisCluster(jedisClusterNodes);
jc.set("key", "value");
String value = jc.get("key");
// jc.close();
```

key 放入哪个槽位置计算，java 实现代码

```java
/**
 * 计算键 key 要放入哪个槽
 * 
 * @param key 键名
 * @return slot 槽编号
 */
public static int slot(String key){
    int slot  = crc16(key) % 16384;
    return slot;
}

/**
 * 计算键 key 的 crc16 值
 * 
 * @param key 键名
 * @return crc16 值
 * @see ~/redis-3.2.11/src/cluster.c and ~/redis-3.2.11/src/crc16.c
 */
public static int crc16(String key) {
    int[] table = {
        0x0000,0x1021,0x2042,0x3063,0x4084,0x50a5,0x60c6,0x70e7,
        0x8108,0x9129,0xa14a,0xb16b,0xc18c,0xd1ad,0xe1ce,0xf1ef,
        0x1231,0x0210,0x3273,0x2252,0x52b5,0x4294,0x72f7,0x62d6,
        0x9339,0x8318,0xb37b,0xa35a,0xd3bd,0xc39c,0xf3ff,0xe3de,
        0x2462,0x3443,0x0420,0x1401,0x64e6,0x74c7,0x44a4,0x5485,
        0xa56a,0xb54b,0x8528,0x9509,0xe5ee,0xf5cf,0xc5ac,0xd58d,
        0x3653,0x2672,0x1611,0x0630,0x76d7,0x66f6,0x5695,0x46b4,
        0xb75b,0xa77a,0x9719,0x8738,0xf7df,0xe7fe,0xd79d,0xc7bc,
        0x48c4,0x58e5,0x6886,0x78a7,0x0840,0x1861,0x2802,0x3823,
        0xc9cc,0xd9ed,0xe98e,0xf9af,0x8948,0x9969,0xa90a,0xb92b,
        0x5af5,0x4ad4,0x7ab7,0x6a96,0x1a71,0x0a50,0x3a33,0x2a12,
        0xdbfd,0xcbdc,0xfbbf,0xeb9e,0x9b79,0x8b58,0xbb3b,0xab1a,
        0x6ca6,0x7c87,0x4ce4,0x5cc5,0x2c22,0x3c03,0x0c60,0x1c41,
        0xedae,0xfd8f,0xcdec,0xddcd,0xad2a,0xbd0b,0x8d68,0x9d49,
        0x7e97,0x6eb6,0x5ed5,0x4ef4,0x3e13,0x2e32,0x1e51,0x0e70,
        0xff9f,0xefbe,0xdfdd,0xcffc,0xbf1b,0xaf3a,0x9f59,0x8f78,
        0x9188,0x81a9,0xb1ca,0xa1eb,0xd10c,0xc12d,0xf14e,0xe16f,
        0x1080,0x00a1,0x30c2,0x20e3,0x5004,0x4025,0x7046,0x6067,
        0x83b9,0x9398,0xa3fb,0xb3da,0xc33d,0xd31c,0xe37f,0xf35e,
        0x02b1,0x1290,0x22f3,0x32d2,0x4235,0x5214,0x6277,0x7256,
        0xb5ea,0xa5cb,0x95a8,0x8589,0xf56e,0xe54f,0xd52c,0xc50d,
        0x34e2,0x24c3,0x14a0,0x0481,0x7466,0x6447,0x5424,0x4405,
        0xa7db,0xb7fa,0x8799,0x97b8,0xe75f,0xf77e,0xc71d,0xd73c,
        0x26d3,0x36f2,0x0691,0x16b0,0x6657,0x7676,0x4615,0x5634,
        0xd94c,0xc96d,0xf90e,0xe92f,0x99c8,0x89e9,0xb98a,0xa9ab,
        0x5844,0x4865,0x7806,0x6827,0x18c0,0x08e1,0x3882,0x28a3,
        0xcb7d,0xdb5c,0xeb3f,0xfb1e,0x8bf9,0x9bd8,0xabbb,0xbb9a,
        0x4a75,0x5a54,0x6a37,0x7a16,0x0af1,0x1ad0,0x2ab3,0x3a92,
        0xfd2e,0xed0f,0xdd6c,0xcd4d,0xbdaa,0xad8b,0x9de8,0x8dc9,
        0x7c26,0x6c07,0x5c64,0x4c45,0x3ca2,0x2c83,0x1ce0,0x0cc1,
        0xef1f,0xff3e,0xcf5d,0xdf7c,0xaf9b,0xbfba,0x8fd9,0x9ff8,
        0x6e17,0x7e36,0x4e55,0x5e74,0x2e93,0x3eb2,0x0ed1,0x1ef0
    };

    byte[] bytes = key.getBytes();
    int crc = 0x0000;
    for (byte b : bytes) {
        crc = (crc << 8) ^ table[((crc >> 8) ^ b) & 0x00FF];
    } 
    crc = crc & 0x3FFF;

    return crc;
}

public static void main(String[] args) {
    String key = "key1";
    int slot = slot(key);
    System.out.print("slot=" + slot); // 输出 slot=9189，和上一节中的数据存储测试结果相同
}
```

## 参考资料

- [Redis 集群搭建详细指南](http://www.cnblogs.com/mafly/p/redis_cluster.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

