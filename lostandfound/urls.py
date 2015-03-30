#!/usr/bin/env python
#encoding=utf-8

from django.conf.urls import patterns, url

# 页面请求URL
urlpatterns = patterns(
    'lostandfound.views',

    # index request
    url(r'^$', 'index'),

    # register request
    url(r'^register.html$', 'register'),

    # login request
    url(r'^login.html$', 'login'),

    # quickRegGoods request
    url(r'^quickRegGoods.html$', 'quickreggoods')
)

# 登录请求URL
urlpatterns += patterns(
    'lostandfound.ajax_register_views',

    # 用户名请求
    url(r'^login/userNameExist.json$', 'userNameExist'),

    # 昵称请求
    url(r'^login/nickNameExist.json$', 'nickNameExist'),

    # 注册请求
    url(r'^login/userRegister.json$', 'userRegister'),

)
