# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Record_Messages',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=20)),
                ('release_time', models.DateTimeField(default=datetime.datetime(2015, 3, 30, 5, 36, 8, 85000, tzinfo=utc))),
                ('release_type', models.IntegerField()),
                ('detail_address', models.CharField(max_length=50)),
                ('detail_describe', models.CharField(max_length=300)),
                ('picture_path', models.FileField(upload_to=b'./messagepicture')),
                ('remark', models.CharField(max_length=100)),
                ('status', models.IntegerField()),
                ('user_name', models.CharField(max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_name', models.CharField(max_length=20)),
                ('nick_name', models.CharField(max_length=10)),
                ('password', models.CharField(max_length=20)),
                ('tell_number', models.CharField(max_length=11)),
                ('reg_date', models.DateTimeField(default=datetime.datetime(2015, 3, 30, 5, 36, 8, 83000, tzinfo=utc))),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
