---
layout: post
title: jquery select2 设置初始值
date: 2017-09-16 02:25:02 +0800
lastmod: 2017-09-16 02:25:02 +0800
category : it
tagline: "Supporting tagline"
tags : [jQuery,select2]
---
# jquery select2 设置初始值
---
jquery select2 设置初始值主要有两种方法，以下两种方法中，均设置 option 列表中第一个 option 为选中项。

#### 1. 给 option 元素添加 selected 属性
```
<select id="s2id">
   <option id="id1" selected="selected">text 1</option>
   <option id="id2">text 2</option>
</select>

$('#s2id').select2();
```

#### 2. 调用 js 给 select2 设置值
```
<select id="s2id">
   <option id="id1">text 1</option>
   <option id="id2">text 2</option>
</select>

var val1 = $('#s2id option:eq(0)').val();
$('#s2id').select2().select2('val', val1);
```