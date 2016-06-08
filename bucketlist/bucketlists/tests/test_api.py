from django.contrib.auth.models import User
from rest_framework.test import APITestCase


class AccountTest(APITestCase):

    """Test /api/v1/bucketlists/ endpoint"""

    def setUp(self):
        """Set up base user and details for test running."""
        # register a user
        #self.register()

    def register(self):
        user_detail = {
            'username': 'sundayguru',
            'email':'test@example.com',
            'password': 'tester123',
            'first_name': 'sunday',
            'last_name': 'goodman',
        }
        return self.client.post('/api/v1/auth/register/', user_detail)

    def test_register(self):
        response = self.register()
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        self.register()
        user_detail = {
            'username': 'sundayguru',
            'password': 'tester123'
        }
        response = self.client.post('/api/v1/auth/login/', user_detail)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data.get('login'))
        user_detail['username'] = 'wrong'
        response = self.client.post('/api/v1/auth/login/', user_detail)
        self.assertEqual(response.status_code, 400)



class BucketlistTest(APITestCase):

    """Test /api/v1/bucketlists/ endpoint"""

    def setUp(self):
        """Set up base user and details for test running."""
        self.register()
        self.token = self.login()
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

    def register(self):
        user_detail = {
            'username': 'sundayguru',
            'email':'test@example.com',
            'password': 'tester123',
            'first_name': 'sunday',
            'last_name': 'goodman',
        }
        return self.client.post('/api/v1/auth/register/', user_detail)

    def create_bucketlist(self, name):
        data = {
            'name': name
        }
        return self.client.post('/api/v1/bucketlists/', data)

    def login(self):
        self.register()
        user_detail = {
            'username': 'sundayguru',
            'password': 'tester123'
        }
        response = self.client.post('/api/v1/auth/login/', user_detail)
        return response.data.get('token')

    def test_bucketlist_create(self):
        response = self.create_bucketlist('Test list')
        self.assertEqual(response.status_code, 201)

    def test_bucketlist_list(self):
        self.create_bucketlist('Test list')
        response = self.client.get('/api/v1/bucketlists/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('count'), 1)

    def test_bucketlist_list_single(self):
        res = self.create_bucketlist('Test list')
        bucketlist_id = res.data.get('id')
        response = self.client.get('/api/v1/bucketlists/'+ str(bucketlist_id) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('id'), bucketlist_id)

    def test_bucketlist_update(self):
        res = self.create_bucketlist('Test list')
        bucketlist_id = res.data.get('id')
        response = self.client.put('/api/v1/bucketlists/'+ str(bucketlist_id) + '/',{'name':'Test list modified'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), 'Test list modified')

    def test_bucketlist_delete(self):
        res = self.create_bucketlist('Test list')
        bucketlist_id = res.data.get('id')
        response = self.client.delete('/api/v1/bucketlists/'+ str(bucketlist_id) + '/')
        self.assertEqual(response.status_code, 204)


class BucketlistItemTest(APITestCase):

    """Test /api/v1/bucketlists/ endpoint"""

    def setUp(self):
        """Set up base user and details for test running."""
        self.register()
        self.token = self.login()
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        bucketlists = self.create_bucketlist('test list')
        self.bucketlist_id = bucketlists.data.get('id')
        self.item_path = '/api/v1/bucketlists/' + str(self.bucketlist_id) + '/items/'

    def register(self):
        user_detail = {
            'username': 'sundayguru',
            'email':'test@example.com',
            'password': 'tester123',
            'first_name': 'sunday',
            'last_name': 'goodman',
        }
        return self.client.post('/api/v1/auth/register/', user_detail)

    def create_bucketlist(self, name):
        data = {
            'name': name
        }
        return self.client.post('/api/v1/bucketlists/', data)

    def create_bucketlist_item(self, task):
        data = {
            'task': task
        }
        return self.client.post(self.item_path, data)

    def login(self):
        self.register()
        user_detail = {
            'username': 'sundayguru',
            'password': 'tester123'
        }
        response = self.client.post('/api/v1/auth/login/', user_detail)
        return response.data.get('token')

    def test_bucketlist_item_create(self):
        response = self.create_bucketlist_item('Test list item')
        self.assertEqual(response.status_code, 201)

    def test_bucketlist_item_list(self):
        self.create_bucketlist_item('Test list item')
        response = self.client.get(self.item_path)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('count'), 1)

    def test_bucketlist_item_single(self):
        res = self.create_bucketlist_item('Test list item')
        item_id = res.data.get('id')
        response = self.client.get(self.item_path + str(item_id) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('id'), item_id)

    def test_bucketlist_item_update(self):
        res = self.create_bucketlist_item('Test list item')
        item_id = res.data.get('id')
        response = self.client.put(self.item_path + str(item_id) + '/',{'task':'Test list item modified'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('task'), 'Test list item modified')

    def test_bucketlist_item_delete(self):
        res = self.create_bucketlist_item('Test list item')
        item_id = res.data.get('id')
        response = self.client.delete(self.item_path + str(item_id) + '/')
        self.assertEqual(response.status_code, 204)





