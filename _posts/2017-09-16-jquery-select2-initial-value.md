---
layout: post
title: "jQuery select2 设置初始值"
date: 2017-09-16 02:25:02 +0800
categories:
  - jQuery
tags:
  - select2
---

jquery select2 设置初始值主要有两种方法，以下两种方法中，均设置 option 列表中第一个 option 为选中项。

## 方法一：给 option 元素添加 selected 属性
```html
<select id="s2id">
   <option value="value1" selected="selected">text 1</option>
   <option value="value2">text 2</option>
</select>
```
```javascript
$('#s2id').select2();
```

## 方法二：调用 js 给 select2 设置值
```html
<select id="s2id">
   <option value="value1">text 1</option>
   <option value="value2">text 2</option>
</select>
```
```javascript
var val1 = $('#s2id option:eq(0)').val();
$('#s2id').select2().select2('val', val1);
```
