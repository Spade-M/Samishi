import os
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from .models import PostImage, Profile

@receiver(pre_delete, sender=PostImage)
def delete_post_image_file(sender, instance, **kwargs):
    if instance.image and os.path.isfile(instance.image.path):
        os.remove(instance.image.path)

@receiver(pre_delete, sender=Profile)
def delete_profile_image_file_on_delete(sender, instance, **kwargs):
    if instance.profile_picture and os.path.isfile(instance.profile_picture.path):
        os.remove(instance.profile_picture.path)

@receiver(pre_save, sender=Profile)
def delete_old_profile_image_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return  # New profile, nothing to delete
    try:
        old_instance = Profile.objects.get(pk=instance.pk)
    except Profile.DoesNotExist:
        return
    old_image = old_instance.profile_picture
    new_image = instance.profile_picture
    if old_image and old_image != new_image and os.path.isfile(old_image.path):
        os.remove(old_image.path)
