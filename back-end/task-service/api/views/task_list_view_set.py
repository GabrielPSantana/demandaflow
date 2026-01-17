from rest_framework.response import Response
from rest_framework import status
from ..serializers import TaskSerializer, TaskListSerializer
from ..services import TaskListService
from .task_view_set import TaskViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskListViewSet(TaskViewSet):
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
        try:
            team_id=request.query_params.get("team_id")

            user_id='d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b'
            is_manager=True

            tasks = TaskListService().execute(
                user_id=user_id,
                team_id=team_id,
                is_manager=is_manager,
            )

            return Response(
                TaskSerializer(tasks, many=True).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": "Ocorreu um erro ao processar a requisição."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )