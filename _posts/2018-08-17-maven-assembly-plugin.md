---
layout: post
title: "使用 maven-assembly-plugin 打包"
date: 2018-08-17 13:29:01 +0800
categories:
  - Maven
tags:
  - assembly
  - plugin
---

现在有这样一个需求，在一个 java 项目的源码根目录下增加一个 Dockerfile 文件，先把项目打包成一个完整的压缩包 your-app-bin.zip（包含 bin、config、lib 等目录），再把压缩包 your-app-bin.zip 和 Dockerfile 文件一起打包成另一个压缩包 your-app-docker.zip（your-app-bin.zip 和 Dockerfile 文件平级）。

因项目使用 maven 管理，并使用 maven-assembly-plugin 打包。可以在项目 pom.xml 中 maven-assembly-plugin 的配置下增加第二个打包配置文件。

<!-- more -->

## pom.xml 中 maven-assembly-plugin 插件配置

```xml
<!-- The configuration of maven-assembly-plugin -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>2.4.1</version>
    <!-- The configuration of the plugin -->
    <configuration>
        <finalName>your-app</finalName>
        <!-- append assembly id in release file name -->
        <appendAssemblyId>true</appendAssemblyId>
        <!-- Specifies the configuration file of the assembly plugin -->
        <descriptors>
            <descriptor>src/main/assembly/bin.xml</descriptor>
            <descriptor>src/main/assembly/docker.xml</descriptor>
        </descriptors>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

## bin.xml 内容

常规编写即可，没什么特殊要求。

## docker.xml 示例

```xml
<assembly>
	<id>docker</id>
	<formats>
		<format>zip</format>
	</formats>
	<dependencySets>
	</dependencySets>
	<fileSets>
		<fileSet>
			<directory>${project.basedir}/target</directory>
			<outputDirectory>.</outputDirectory>
			<includes>
				<include>*.zip</include>
			</includes>
		</fileSet>

		<fileSet>
			<directory>${project.basedir}</directory>
			<outputDirectory>.</outputDirectory>
			<includes>
				<include>Dockerfile</include>
			</includes>
		</fileSet>
	</fileSets>
</assembly>
```

## 参考资料

- [Apache Maven Assembly Plugin](http://maven.apache.org/plugins/maven-assembly-plugin/assembly.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

- [使用maven-assembly-plugin打包，assembly的语法介绍(同时打多个包、排除依赖包、文件更改别名、自定义路径)](https://blog.csdn.net/u013174217/article/details/53300818){:target="_blank"}{:rel="nofollow noopener noreferrer"}
