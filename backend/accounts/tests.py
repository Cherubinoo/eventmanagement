from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Role

User = get_user_model()

REGISTER_URL = '/api/auth/register/'
LOGIN_URL = '/api/auth/login/'
REFRESH_URL = '/api/auth/refresh/'
ME_URL = '/api/auth/me/'
ORGANIZERS_URL = '/api/admin/organizers/'


def organizer_detail_url(pk):
    return f'/api/admin/organizers/{pk}/'


class RegistrationTests(APITestCase):
    def test_register_creates_normal_user(self):
        response = self.client.post(REGISTER_URL, {
            'name': 'Vishal',
            'email': 'vishal@example.com',
            'phone': '9876543210',
            'password': 'StrongPassword123!',
            'password_confirm': 'StrongPassword123!',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email='vishal@example.com')
        self.assertEqual(user.role, Role.USER)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_register_ignores_client_supplied_role_and_privileges(self):
        response = self.client.post(REGISTER_URL, {
            'name': 'Sneaky',
            'email': 'sneaky@example.com',
            'phone': '111',
            'password': 'StrongPassword123!',
            'password_confirm': 'StrongPassword123!',
            'role': 'SUPER_ADMIN',
            'is_staff': True,
            'is_superuser': True,
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email='sneaky@example.com')
        self.assertEqual(user.role, Role.USER)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_register_rejects_mismatched_passwords(self):
        response = self.client.post(REGISTER_URL, {
            'name': 'Bad',
            'email': 'bad@example.com',
            'phone': '111',
            'password': 'StrongPassword123!',
            'password_confirm': 'Different123!',
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(User.objects.filter(email='bad@example.com').exists())


class SuperAdminTests(APITestCase):
    def test_createsuperuser_assigns_super_admin_role(self):
        admin = User.objects.create_superuser(
            email='admin@example.com', name='Admin', password='AdminPass123!'
        )
        self.assertEqual(admin.role, Role.SUPER_ADMIN)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)


class LoginAndMeTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='user@example.com', name='Regular User', password='UserPass123!'
        )

    def test_login_returns_tokens_and_role(self):
        response = self.client.post(LOGIN_URL, {'email': 'user@example.com', 'password': 'UserPass123!'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['role'], Role.USER)
        self.assertEqual(response.data['user']['email'], 'user@example.com')

    def test_me_returns_authenticated_users_profile(self):
        login = self.client.post(LOGIN_URL, {'email': 'user@example.com', 'password': 'UserPass123!'})
        access = login.data['access']
        response = self.client.get(ME_URL, HTTP_AUTHORIZATION=f'Bearer {access}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'user@example.com')
        self.assertEqual(response.data['role'], Role.USER)

    def test_refresh_issues_new_access_token(self):
        login = self.client.post(LOGIN_URL, {'email': 'user@example.com', 'password': 'UserPass123!'})
        refresh = login.data['refresh']
        response = self.client.post(REFRESH_URL, {'refresh': refresh})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_me_requires_authentication(self):
        response = self.client.get(ME_URL)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class OrganizerPermissionTests(APITestCase):
    def setUp(self):
        self.super_admin = User.objects.create_superuser(
            email='admin@example.com', name='Admin', password='AdminPass123!'
        )
        self.user = User.objects.create_user(
            email='user@example.com', name='Regular User', password='UserPass123!'
        )
        self.organizer = User.objects.create_user(
            email='org@example.com', name='Organizer One', password='OrgPass123!', role=Role.ORGANIZER
        )

    def authenticate_as(self, email, password):
        login = self.client.post(LOGIN_URL, {'email': email, 'password': password})
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {login.data["access"]}')

    def test_super_admin_can_create_organizer(self):
        self.authenticate_as('admin@example.com', 'AdminPass123!')
        response = self.client.post(ORGANIZERS_URL, {
            'name': 'New Organizer',
            'email': 'neworg@example.com',
            'phone': '222',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created = User.objects.get(email='neworg@example.com')
        self.assertEqual(created.role, Role.ORGANIZER)
        self.assertIn('generated_password', response.data)

        # the new organizer can immediately log in with the generated password
        login = self.client.post(LOGIN_URL, {
            'email': 'neworg@example.com',
            'password': response.data['generated_password'],
        })
        self.assertEqual(login.status_code, status.HTTP_200_OK)
        self.assertEqual(login.data['user']['role'], Role.ORGANIZER)

    def test_super_admin_can_list_organizers(self):
        self.authenticate_as('admin@example.com', 'AdminPass123!')
        response = self.client.get(ORGANIZERS_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        emails = [row['email'] for row in response.data]
        self.assertIn('org@example.com', emails)

    def test_super_admin_can_update_organizer(self):
        self.authenticate_as('admin@example.com', 'AdminPass123!')
        response = self.client.patch(organizer_detail_url(self.organizer.pk), {'phone': '999'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.organizer.refresh_from_db()
        self.assertEqual(self.organizer.phone, '999')

    def test_super_admin_can_delete_organizer(self):
        self.authenticate_as('admin@example.com', 'AdminPass123!')
        response = self.client.delete(organizer_detail_url(self.organizer.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(pk=self.organizer.pk).exists())

    def test_user_cannot_create_organizer(self):
        self.authenticate_as('user@example.com', 'UserPass123!')
        response = self.client.post(ORGANIZERS_URL, {
            'name': 'Blocked',
            'email': 'blocked1@example.com',
            'phone': '333',
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_organizer_cannot_create_organizer(self):
        self.authenticate_as('org@example.com', 'OrgPass123!')
        response = self.client.post(ORGANIZERS_URL, {
            'name': 'Blocked',
            'email': 'blocked2@example.com',
            'phone': '333',
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_cannot_list_organizers(self):
        self.authenticate_as('user@example.com', 'UserPass123!')
        response = self.client.get(ORGANIZERS_URL)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_organizer_cannot_list_organizers(self):
        self.authenticate_as('org@example.com', 'OrgPass123!')
        response = self.client.get(ORGANIZERS_URL)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_cannot_access_organizers(self):
        response = self.client.get(ORGANIZERS_URL)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_no_client_can_register_as_organizer_or_super_admin(self):
        # public registration never accepts a role field regardless of caller
        response = self.client.post(REGISTER_URL, {
            'name': 'Escalate',
            'email': 'escalate@example.com',
            'phone': '444',
            'password': 'StrongPassword123!',
            'password_confirm': 'StrongPassword123!',
            'role': 'ORGANIZER',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get(email='escalate@example.com').role, Role.USER)
