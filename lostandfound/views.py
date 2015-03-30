#!/usr/bin/env python
#encoding=utf-8

from django.shortcuts import render_to_response


def index(request):
    # 请求首页
    return render_to_response('lostandfound/index.html')


def register(request):
    # 注册页面
    return render_to_response('lostandfound/register.html')


def login(request):
    # 登录页面
    return render_to_response('lostandfound/login.html')


def quickreggoods(request):
    # 快速发布页面
    return render_to_response('lostandfound/quickRegGoods.html')
