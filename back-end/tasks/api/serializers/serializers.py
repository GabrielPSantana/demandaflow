from rest_framework import serializers
from ..models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task

        fields = [
            'tasks_id','title', 'description', 'priority', 
            'status', 'start_datetime', 'end_datetime',
            'time_spent', 'team_id'
        ]

    