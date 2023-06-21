from django.contrib import admin
from .models import Packages


# Register your models here.
@admin.register(Packages)
class Packages(admin.ModelAdmin):
    list_display = ["package_name", "price", "promotion", "thumbnail", "created_at"]


admin.register(Packages)
