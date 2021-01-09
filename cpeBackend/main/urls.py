from django.urls import path, include
from .views import GithubAccessCodeAPI,GithubUserDetailAPI, GithubPRAPI

urlpatterns = [
    path('github/accesscode/<str:auth_code>', GithubAccessCodeAPI.as_view(), name="Fetches github access code"),
    path('github/user/<str:username>', GithubUserDetailAPI.as_view(), name="Fetches github user details"),
    path('github/pr/collect', GithubPRAPI.as_view(), name="Creates PR"),
]