from rest_framework import serializers
from .models import GithubUser, CollectedPR

class CollectedPRSerializer(serializers.ModelSerializer):

    class Meta:
        model = CollectedPR
        fields = '__all__'


class GithubUserSerializer(serializers.ModelSerializer):
    pr_by = CollectedPRSerializer(many=True, read_only=True)
    class Meta:
        model = GithubUser
        fields = '__all__'
