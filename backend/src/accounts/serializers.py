from rest_framework import serializers
from .models import AuthUser


class RegisterSerializers(serializers.ModelSerializer):
    user_name = serializers.CharField(max_length=200, default=None, allow_blank=True)
    email = serializers.CharField(max_length=200, default=None, allow_blank=True)
    password = serializers.CharField(max_length=200, default=None, allow_blank=True, write_only=True)

    class Meta:
        model = AuthUser
        fields = ["user_name", "email", "password"]

    def validate(self, args):
        email = args.get('email', None)
        user_name = args.get('user_name', None)

        if AuthUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "email aready exits"})
        if AuthUser.objects.filter(user_name=user_name).exists():
            raise serializers.ValidationError({"user_name": "username aready exits"})

        return super().validate(args)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
