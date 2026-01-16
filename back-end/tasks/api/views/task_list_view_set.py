from rest_framework.response import Response
from rest_framework import status
from ..serializers import TaskSerializer, TaskListSerializer
from ..services import ListTaskService
from .task_view_set import TaskViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import logging

logger = logging.getLogger(__name__)

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
            serializer = TaskListSerializer(data=request.query_params)

            if not serializer.is_valid():
                return Response(
                    {"error": "Parâmetros inválidos."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            data = serializer.validated_data

            tasks = ListTaskService().execute(
                user_id=data["user_id"],
                team_id=data.get("team_id"),
                is_manager=data.get("is_manager", False),
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
