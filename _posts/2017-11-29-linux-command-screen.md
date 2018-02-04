---
layout: post
title: "Linux screen 命令"
date: 2017-11-29 16:24:25 +0800
categories:
  - Linux
tags:
  - command
  - screen
---

Screen is a full-screen window manager that multiplexes a physical terminal between several processes, typically interactive shells. Each virtual terminal provides the functions of the DEC VT100 terminal and, in addition, several control functions from the ANSI X3.64 (ISO 6429) and ISO 2022 standards (e.g., insert/delete line and support for multiple character sets). There is a scrollback history buffer for each virtual terminal and a copy-and-paste mechanism that allows the user to move text regions between windows. When screen is called, it creates a single window with a shell in it (or the specified command) and then gets out of your way so that you can use the program as you normally would. Then, at any time, you can create new (full-screen) windows with other programs in them (including more shells), kill the current window, view a list of the active windows, turn output logging on and off, copy text between windows, view the scrollback history, switch between windows, etc. All windows run their programs completely independent of each other. Programs continue to run when their window is currently not visible and even when the whole screen session is detached from the users terminal. 
<!-- more -->

## 创建会话

```
screen -S test1
```

## 会话共享

```
screen -x test1
```

## 参考资料

- [GNU's Screen 官方站点](http://www.gnu.org/software/screen/){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
- [linux screen 命令详解](https://www.cnblogs.com/mchina/archive/2013/01/30/2880680.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}  
