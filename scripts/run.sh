#!/bin/sh

set -e

python manage.py collectstatic --noinput
python manage.py migrate

# Create test user account automatically
python manage.py create_test_user

# Create symlink for media files
ln -sf /vol/web/media /vol/web/static/media

uwsgi --socket :9000 --workers 4 --master --enable-threads --module chunkitapp_project.wsgi
