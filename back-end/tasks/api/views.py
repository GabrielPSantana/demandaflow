from rest_framework import viewsets
from rest_framework.response import Response
from api.serializers import TaskSerializer
from api.services import ListTaskService

class TaskViewSet(viewsets.ViewSet):
    def list(self, request):
        team_id = request.query_params.get('team_id')
        is_manager = request.query_params.get('is_manager', 'false').lower() == 'true'
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response(
                {"error": "Parâmetros insuficientes ou inválidos"},
                status=400
            )
        
        list_tasks_service = ListTaskService()
        tasks = list_tasks_service.execute(user_id=user_id, team_id=team_id, is_manager=is_manager)
        
        list_serializer = TaskSerializer(tasks, many=True)

        return Response(list_serializer.data)
