from rest_framework import serializers

class TaskListSerializer(serializers.Serializer):
    user_id = serializers.UUIDField(required=True)
    team_id = serializers.UUIDField(required=False)
    is_manager = serializers.BooleanField(required=False)
