#!/usr/bin/env python
#encoding=utf-8

from lostandfound import models
from django.http import HttpResponse
import json, pdb


# 获取用户注册的用户名,检验是否存在
def userNameExist(requset):
    u = requset.POST['username']
    rsdic = {}
    # 返回一个QuerySet[]
    user = models.User.objects.all().filter(user_name=u)
    if (user.count() == 1):
        rsdic['isUserNameExist'] = True
    else:
        rsdic['isUserNameExist'] = False
    return HttpResponse(json.dumps(rsdic))


# 获取用户注册的用户名,检验是否存在
def nickNameExist(requset):
    n = requset.POST['nickname']
    rsdic = {}
    # 返回一个QuerySet[]
    user = models.User.objects.all().filter(nick_name=n)
    if (user.count() == 1):
        rsdic['isNickNameExist'] = True
    else:
        rsdic['isNickNameExist'] = False
    return HttpResponse(json.dumps(rsdic))


# 用户注册
def userRegister(requset):
    u = requset.POST['username']
    n = requset.POST['nickname'].encode('utf-8')
    p = requset.POST['password']
    rsdic = {}
    user = models.User(user_name=u, nick_name=n, password=p)
    try:
        user.save()
        rsdic['isRegisterSuccess'] = True
    except:
        rsdic['isRegisterSuccess'] = False
    return HttpResponse(json.dumps(rsdic))


# 验证用户传过来的Cookie用户名和密码
def isAutoLogin(requset):
    u = requset.POST['username']
    p = requset.POST['password']
    rsdic = {}
    user = models.User.objects.all().filter(user_name=u, password=p)
    if(user.count() == 1):
        rsdic['isAutoLogin'] = True
    else:
        rsdic['isAutoLogin'] = False
    return HttpResponse(json.dumps(rsdic))
