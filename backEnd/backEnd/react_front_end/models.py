import re
import uuid
from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.
def phone_regex_validator(value):
    if not re.match(r'^\+\d{1,15}$', value):
        raise ValidationError("Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")






class Profile(models.Model):
    CHOICES = [
        ('Male',"Male"),
        ('Female','Female'),
    ]

    id = models.CharField(primary_key=True, default='',max_length=400,)

    username = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )

    profile_picture = models.ImageField(
        upload_to= 'profile-picture',
        blank=True,
        null=True,
    )

    phone_number = models.CharField(
        validators=[phone_regex_validator,],
        max_length=17,
        blank=True,
        null=True,

    )

    gender = models.CharField(
        max_length= 7,
        choices=CHOICES,
        blank=True,
        null=True,

    )

