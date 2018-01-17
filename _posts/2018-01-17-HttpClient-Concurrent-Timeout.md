---
layout: post
title: "HttpClient 并发报 Timeout waiting for connection from pool"
date: 2018-01-17 11:00:01 +0800
categories:
  - it
tags:
  - HttpClient 
  - Concurrent
  - Timeout
---

新建了一个 HttpClient 实例，使用 for 循环调用，结果报出以下错误
```java
org.apache.http.conn.ConnectionPoolTimeoutException: Timeout waiting for connection from pool
```

解决方法，修改连接池配置，增大连接数
```java
RequestConfig config = RequestConfig.custom()  
    .setSocketTimeout(socketTimeout)  
    .setConnectTimeout(connectTimeout)  
    .setConnectionRequestTimeout(connectionRequestTimeout).build();  
httpClient = HttpClients.custom().setDefaultRequestConfig(config)  
     .setMaxConnTotal(maxConnTotal)  
     .setMaxConnPerRoute(maxConnPerRoute).build(); 
```

# 参考资料
- [使用httpclient必须知道的参数设置及代码写法、存在的风险](http://jinnianshilongnian.iteye.com/blog/2089792){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [HttpClient大并发下Timeout waiting for connection from pool优化方案](http://blog.csdn.net/falynn1220/article/details/50607789){:target="_blank"}{:rel="nofollow noopener noreferrer"}
