from django.db import models
import uuid
from .managers import TaskManager

class Task(models.Model):
    class Priority(models.TextChoices):
        LOW = 'LOW'
        MEDIUM = 'MEDIUM'
        HIGH = 'HIGH'
        CRITICAL = 'CRITICAL'
    
    class Status(models.TextChoices):
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    
    task_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    published = models.BooleanField(default=True)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    priority = models.CharField(max_length=20, choices=Priority.choices)
    start_datetime = models.DateTimeField(null=True, blank=True)
    end_datetime = models.DateTimeField(null=True, blank=True)
    time_spent = models.DurationField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user_id = models.UUIDField(blank=False, null=False) 
    team_id = models.UUIDField(blank=True, null=True)

    objects = TaskManager()

    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title