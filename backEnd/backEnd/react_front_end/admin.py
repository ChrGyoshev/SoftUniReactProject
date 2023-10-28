from django.contrib import admin

from backEnd.react_front_end.models import Profile


# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass