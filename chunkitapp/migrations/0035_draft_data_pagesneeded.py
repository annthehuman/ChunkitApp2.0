# Generated by Django 3.1.3 on 2022-04-17 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chunkitapp', '0034_delete_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='draft_data',
            name='pagesNeeded',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
    ]
