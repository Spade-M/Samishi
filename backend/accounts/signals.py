import os
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import PostImage

@receiver(pre_delete, sender=PostImage)
def delete_post_image_file(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
