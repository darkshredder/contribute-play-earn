# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from .models import GithubUser, CollectedPR
# Register your models here.
admin.site.register(GithubUser)
admin.site.register(CollectedPR)