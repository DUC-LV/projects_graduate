from django.contrib import admin
from .models import AuthUser
from django.contrib.auth.admin import UserAdmin


# Register your models here.
class UserAdminConfig(UserAdmin):
    model = AuthUser

    list_display = ['email', 'id', 'user_name', 'first_name', 'last_name', 'is_active']
    list_filter = ('email', 'user_name', 'first_name', 'is_active')
    ordering = ('-user_name',)


admin.site.register(AuthUser, UserAdminConfig)
