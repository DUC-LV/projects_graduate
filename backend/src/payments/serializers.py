from rest_framework import serializers
from .models import Packages


class PackageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = ["id", "package_name", "price", "promotion", "thumbnail"]
