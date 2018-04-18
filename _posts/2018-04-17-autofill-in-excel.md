---
layout: post
title: "Excel 自动填充数据"
date: 2018-04-17 01:01:07 +0800
categories:
  - Excel
tags:
  - autofill
---

现在有一个需求，在 excel 表格某一列中要填入 80000 个连续的手机号码，从 18900000001 到 18900080000。

## 手工录入

* 一个号码一个号码地录入，十分耗时，只录入少数数据时适用。本方法对于填充 80000 个单元格的数据不适用
* 先录入第一个号码，再通过托动单元格右下角的填充柄填充数据。本方法对于填充 80000 个单元格的数据也不太适用

## 序列填充

在单元格内填入第一个手机号码 18900000001

<!-- more -->

![excel-autofill_1.png]({{ site.baseurl }}/uploads/2018/04/excel-autofill_1.png)

在菜单中选择“编辑”->“填充”->“序列”

![excel-autofill_2.png]({{ site.baseurl }}/uploads/2018/04/excel-autofill_2.png)

在弹出的窗口中，序列产生在选择“列”，类型选择“等差数列”，步长值填写“1”，终止值填写“18900080000“，点击确定按钮

![excel-autofill_3.png]({{ site.baseurl }}/uploads/2018/04/excel-autofill_3.png)

序列填充完成后，可以看到，第一个值为 18900000001，最后一个值为 18900080000

![excel-autofill_4.png]({{ site.baseurl }}/uploads/2018/04/excel-autofill_4.png)
![excel-autofill_5.png]({{ site.baseurl }}/uploads/2018/04/excel-autofill_5.png)

## 注意事项

* Excel 2003（.xls）最大行数为 65536，Excel 2007（.xlsx）最大行数为 1048576
* Excel 2003（.xls）最大列数为 256，Excel 2007（.xlsx）最大列数为 16384

