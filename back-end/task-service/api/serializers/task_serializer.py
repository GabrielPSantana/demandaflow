from rest_framework import serializers
from ..models import Task


class TaskSerializer(serializers.ModelSerializer):
    start_datetime = serializers.DateTimeField(
        format="%Y-%m-%dT%H:%M",
        input_formats=["%Y-%m-%dT%H:%M"],
        required=False,
        allow_null=True
    )

    end_datetime = serializers.DateTimeField(
        format="%Y-%m-%dT%H:%M",
        input_formats=["%Y-%m-%dT%H:%M"],
        required=False,
        allow_null=True
    )

    class Meta:
        model = Task
        fields = [
            'task_id', 'title', 'description', 'priority',
            'status', 'start_datetime', 'end_datetime',
            'time_spent', 'team_id'
        ]
