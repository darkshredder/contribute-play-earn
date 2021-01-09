from django.shortcuts import render
from django.utils import timezone
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import GithubUser, CollectedPR
import requests
import json
from .serializers import GithubUserSerializer, CollectedPRSerializer

# Create your views here.

class GithubAccessCodeAPI(APIView):
    def get(self, request, auth_code):
        client_id = "4c3a4a4089509b332cb6"
        client_secret = "6302dddff70d37654dc0bd911dbbc4303f5067d6"
        payload = {'client_id': client_id, 'client_secret': client_secret,'code':auth_code}
        response_1 = requests.get(f'https://github.com/login/oauth/access_token', params=payload)
        access_code = response_1.text
        if (len(access_code.split("&scope")) != 2):
            return Response({"error": "wrong auth code"}, status=status.HTTP_401_UNAUTHORIZED)
        access_code = access_code.split("&scope")[0].split("access_token=")[1]    
        response_2 = requests.get(f'https://api.github.com/user', headers={'Authorization': f'token {access_code}'})
        response_2 = (response_2.json())
        print(response_2["login"])
        profile = GithubUser.objects.filter(username=response_2["login"])
        if (not profile):
            GithubUser(username=response_2["login"]).save()
            print("New user created")
        return Response({"access_code":access_code, "user":response_2},status=status.HTTP_200_OK)

class GithubUserDetailAPI(ListAPIView):
    serializer_class = GithubUserSerializer
    def get_queryset(self):
        current_CA = GithubUser.objects.filter(username=self.kwargs['username'])
        return current_CA

class GithubPRAPI(APIView):

    def post(self, request, format=None):
        if(request.data['pr_by'] and request.data['url']):
            profile = GithubUser.objects.filter(username=request.data['pr_by'])
            if (not profile):
                return Response({"error": "wrong data entered"}, status=status.HTTP_401_UNAUTHORIZED)
            CollectedPR(url=request.data['url'],pr_by=profile[0]).save()
            return Response({"status":"added url"}, status=status.HTTP_200_OK)
