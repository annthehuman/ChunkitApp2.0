# Generated by Django 3.1.3 on 2022-01-28 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chunkitapp', '0029_background_prolific_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='prolific_id',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sentence',
            name='prolific_id',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='test',
            name='prolific_id',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
