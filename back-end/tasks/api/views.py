from rest_framework import viewsets
from rest_framework.response import Response
from api.serializers import TaskSerializer
from api.services import ListTaskService

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskViewSet(viewsets.ViewSet):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'user_id', openapi.IN_QUERY, description="UUID do usuário", type=openapi.TYPE_STRING, required=True
            ),
            openapi.Parameter(
                'team_id', openapi.IN_QUERY, description="UUID do time", type=openapi.TYPE_STRING, required=False
            ),
            openapi.Parameter(
                'is_manager', openapi.IN_QUERY, description="Se é manager", type=openapi.TYPE_BOOLEAN, required=False
            ),
        ]
    )

    def list(self, request):
        team_id = request.query_params.get('team_id')
        is_manager = request.query_params.get('is_manager', 'false').lower() == 'true'
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response(
                {"error": "Parâmetros insuficientes ou inválidos"},
                status=400
            )
        
        tasks = ListTaskService().execute(user_id=user_id, team_id=team_id, is_manager=is_manager)
        return Response(TaskSerializer(tasks, many=True).data)
