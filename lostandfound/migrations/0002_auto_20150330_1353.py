# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('lostandfound', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record_messages',
            name='release_time',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 30, 5, 53, 11, 249000, tzinfo=utc)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='reg_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 30, 5, 53, 11, 247000, tzinfo=utc)),
            preserve_default=True,
        ),
    ]
