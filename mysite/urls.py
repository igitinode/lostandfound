#!/usr/bin/env python
#encoding=utf-8

from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin


urlpatterns = patterns(
    '',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # 系统自带的应用
    url(r'^admin/', include(admin.site.urls)),

    # 映射到失物招领应用
    url(r'^lostandfound/', include('lostandfound.urls')),
) + static(settings.STATIC_URL)
