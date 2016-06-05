from django.contrib.auth.models import User
from django.test import TestCase
from bucketlists.models import *


class BucketListTestModels(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='sundayguru',
            password='tester123'
            )

    def test_bucketlist_creation(self):
        bucketlist = BucketList.objects.create(
            name='test bucket list',
            user=self.user
        )
        self.assertTrue(isinstance(bucketlist, BucketList))
