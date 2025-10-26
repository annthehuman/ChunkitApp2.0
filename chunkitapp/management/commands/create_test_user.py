from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create a test user account for development and testing'

    def handle(self, *args, **options):
        username = 'test@chunkit.app'
        email = 'test@chunkit.app'
        password = 'test1234'
        
        # Create or get the user
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': email,
                'is_active': True,
                'is_staff': False,
                'is_superuser': False
            }
        )
        
        # Set password and ensure user is active
        user.set_password(password)
        user.is_active = True
        user.save()
        
        if created:
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created test user: {username}')
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(f'Test user already exists, password updated: {username}')
            )
        
        self.stdout.write(
            self.style.WARNING(f'Test account credentials:')
        )
        self.stdout.write(f'  Email/Username: {username}')
        self.stdout.write(f'  Password: {password}')
