from django.db import models

class TaskQuerySet(models.QuerySet):
    def by_team(self, team_id):
        return self.filter(team_id=team_id, published=True)

    def by_user(self, user_id):
        return self.filter(user_id=user_id, published=True)
    
    def by_task(self, task_id):
        return self.filter(task_id=task_id, published=True).first()
    
    def by_title(self, user_id, title):
        return self.filter(user_id=user_id, title__icontains=title, published=True)

    def by_user_in_team(self, user_id, team_id):
        return self.filter(user_id=user_id, team_id=team_id, published=True)

    def by_user_without_team(self, user_id):
        return self.filter(user_id=user_id, team_id__isnull=True, published=True)

    def by_task_id_and_user_id(self, task_id, user_id):
        return self.filter(task_id=task_id, user_id=user_id, published=True).first()
    
class TaskManager(models.Manager):
    def get_queryset(self):
        return TaskQuerySet(self.model, using=self._db)

    def by_team(self, team_id):
        return self.get_queryset().by_team(team_id)
    
    def by_user(self, user_id):
        return self.get_queryset().by_user(user_id)
    
    def by_title(self, user_id, title):
        return self.get_queryset().by_title(user_id, title)
    
    def by_task(self, team_id):
        return self.get_queryset().by_team(team_id)

    def by_user_in_team(self, user_id, team_id):
        return self.get_queryset().by_user_in_team(user_id, team_id)

    def by_user_without_team(self, user_id):
        return self.get_queryset().by_user_without_team(user_id)

    def by_task_id_and_user_id(self, task_id, user_id):
        return self.get_queryset().by_task_id_and_user_id(task_id=task_id, user_id=user_id)