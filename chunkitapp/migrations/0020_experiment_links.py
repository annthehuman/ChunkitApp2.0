# Generated by Django 3.1.3 on 2021-12-01 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chunkitapp', '0019_feedback_addedq'),
    ]

    operations = [
        migrations.CreateModel(
            name='experiment_links',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experiment_link', models.TextField()),
            ],
        ),
    ]
