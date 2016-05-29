from __future__ import unicode_literals
from django.conf import settings
from django.db import models


class BucketList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
    name = models.CharField(max_length=180)
    date_modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __unicode__(self):
      return self.name

    def __str__(self):
      return self.name

    def get_absolute_url(self):
      return reverse('bucketlists:detail', kwargs={'id':self.id})

    class Meta:
      ordering = ['-date_created']


    def __repr__(self):
      return '<BucketList %r>' % self.name


class BucketListItem(models.Model):
    task = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
    date_modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)
    bucketlist = models.ForeignKey(BucketList)

    def __unicode__(self):
      return self.task

    def __str__(self):
      return self.task

    class Meta:
      ordering = ['-date_created']

    def __repr__(self):
      return '<BucketListItem %r>' % self.task

