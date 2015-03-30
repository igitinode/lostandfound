#!/usr/bin/env python
#encoding=utf-8
from django.db import models
from django.utils import timezone


class User(models.Model):
    """这是用户信息表"""
    # 登录用户名, 最大长度为20个字符串
    user_name = models.CharField(max_length=20)

    # 用户的昵称
    nick_name = models.CharField(max_length=10)

    # 用户密码
    password = models.CharField(max_length=20)

    # 用户电话号码,最大长度为11位
    tell_number = models.CharField(max_length=11)

    # 注册日期
    reg_date = models.DateTimeField(default=timezone.now())

    def __unicode__(self):
        return self.user_name


class Record_Messages(models.Model):
    """docstring for Record_Messages"""
    # 信息标题
    title = models.CharField(max_length=20)

    # 发布时间 年-月-日 时:分:秒
    release_time = models.DateTimeField(default=timezone.now())

    # 发布种类 lost:1  found:2 作废:3
    release_type = models.IntegerField()

    # 详细地址
    detail_address = models.CharField(max_length=50)

    # 详细描述
    detail_describe = models.CharField(max_length=300)

    # 图片路径
    picture_path = models.FileField(upload_to='./messagepicture')

    # 备注
    remark = models.CharField(max_length=100)

    # 状态 丢失未还:10 丢失已还:11 得到未还:20 得到已还:22
    status = models.IntegerField()

    # 依赖外键
    # 没有设置成models.ForeignKey(User)
    user_name = models.CharField(max_length=20)

    def __unicode__(self):
        return self.user_name
