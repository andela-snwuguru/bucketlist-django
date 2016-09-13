from django.contrib import admin
from .models import *


class BucketListAdmin(admin.ModelAdmin):
    list_display = ['name', 'date_modified', 'date_created']
    list_display_links = ['name']
    list_filter = ['date_created']
    search_fields = ['name']

    class Meta:
        model = BucketList


class BucketListItemAdmin(admin.ModelAdmin):
    list_display = ['task', 'bucketlist', 'date_modified', 'date_created']
    list_display_links = ['task']
    list_filter = ['date_created', 'bucketlist']
    search_fields = ['task']

    class Meta:
        model = BucketListItem

admin.site.register(BucketList, BucketListAdmin)
admin.site.register(BucketListItem, BucketListItemAdmin)
