# Generated by Django 3.1.3 on 2022-04-26 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chunkitapp', '0035_draft_data_pagesneeded'),
    ]

    operations = [
        migrations.AddField(
            model_name='draft_data',
            name='experiment_link',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='draft_data',
            name='experiment_stopped',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='draft_data',
            name='pagesNeeded',
            field=models.TextField(default=['Hello', 'Consent', 'Outline', 'Background', 'Practice', 'Experiment', 'Imitation', 'Feedback', 'Goodbye']),
        ),
    ]