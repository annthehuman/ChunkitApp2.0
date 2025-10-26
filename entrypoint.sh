#! /bin/bash

python manage.py makemigrations --no-input

python manage.py migrate --no-input

python manage.py collectstatic --no-input

# Create test user account automatically
python manage.py create_test_user

# python manage.py runserver 0.0.0.0:8000

exec gunicorn chunkitapp_project.wsgi:application -b 0.0.0.0:8000 --reload