from django.db import models

# Create your models here.
import uuid
from django.db import models

class Tasks(models.Model):
    class Priority(models.TextChoices):
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH', 
        CRITICAL = 'CRITICAL',
    
    class Status(models.TextChoices):
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    
    tasks_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField( max_length=100)
    description = models.TextField(blank=True, null=True)
    priority = models.CharField(max_length=20, choices=Priority.choices)
    start_datetime = models.DateTimeField(null=True, blank=True)
    end_datetime = models.DateTimeField(null=True, blank=True)
    time_spent = models.DurationField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices)
    team_id = models.UUIDField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
