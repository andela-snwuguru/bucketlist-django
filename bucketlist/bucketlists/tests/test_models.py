from django.contrib.auth.models import User
from django.test import TestCase
from bucketlists.models import *


class BucketListTestModels(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='sundayguru',
            password='tester123'
        )

    def create_bucketlist(self):
        return BucketList.objects.create(
            name='test bucket list',
            user=self.user
        )

    def test_bucketlist_item_creation(self):
        bucketlist = self.create_bucketlist()
        bucketlistitem = BucketListItem.objects.create(
            task='test bucket list item',
            bucketlist=bucketlist
        )
        self.assertTrue(isinstance(bucketlistitem, BucketListItem))

    def test_bucketlist_creation(self):
        bucketlist = self.create_bucketlist()
        self.assertTrue(isinstance(bucketlist, BucketList))
