from django.db import models


class GithubUser(models.Model):
    username = models.CharField(max_length=200, verbose_name="Github Username",unique=True)

    def __str__(self):
        return f'{self.username}'

    """
    This class implements Github Users
    """
    class Meta:
        """
        Meta class for Github User
        """
        verbose_name_plural = 'Github Users'

class CollectedPR(models.Model):
    url = models.URLField(max_length=255, verbose_name="PR url")
    pr_by = models.ForeignKey(
        GithubUser, on_delete=models.CASCADE, null=True, related_name='pr_by')
    def __str__(self):
        return f'{self.url} - {self.pr_by.username}'

    """
    This class implements Collected PRs
    """
    class Meta:
        """
        Meta class for Collected PR
        """
        verbose_name_plural = 'Collected PRs'