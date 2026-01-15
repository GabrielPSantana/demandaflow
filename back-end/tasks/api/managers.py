class TaskQuerySet(models.QuerySet):
    def published(self):
        return self.filter(published=True)

class TaskManager(models.Manager):
    def get_queryset(self):
        return TaskQuerySet(self.model, using=self._db)