from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AuthUser


# Register your models here.
class UserAdminConfig(UserAdmin):
    model = AuthUser
    search_fields = ('email', 'user_name', 'first_name',)
    list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('email',)
    list_display = ('email', 'id', 'user_name', 'is_upgrade')
    fieldsets = (
        (None, {'fields': ('email', 'user_name', 'first_name', 'last_name', 'is_upgrade')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )


admin.site.register(AuthUser, UserAdminConfig)
