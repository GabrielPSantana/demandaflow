from django.db import models

class TaskQuerySet(models.QuerySet):
    def by_team(self, team_id):
        return self.filter(team_id=team_id)

    def by_user_in_team(self, user_id, team_id):
        return self.filter(user_id=user_id, team_id=team_id)

    def by_user_without_team(self, user_id):
        return self.filter(user_id=user_id, team_id__isnull=True)

class TaskManager(models.Manager):
    def get_queryset(self):
        return TaskQuerySet(self.model, using=self._db)

    def by_team(self, team_id):
        return self.get_queryset().by_team(team_id)

    def by_user_in_team(self, user_id, team_id):
        return self.get_queryset().by_user_in_team(user_id, team_id)

    def by_user_without_team(self, user_id):
        return self.get_queryset().by_user_without_team(user_id)
