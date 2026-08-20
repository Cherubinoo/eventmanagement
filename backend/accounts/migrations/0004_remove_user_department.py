from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='department',
        ),
    ]
