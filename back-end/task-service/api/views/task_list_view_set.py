from rest_framework.response import Response
from rest_framework import status
from ..serializers import TaskSerializer
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

    def get_tasks_queryset(self):
        search = self.request.query_params.get("search")

        user_id = "d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b"

        return TaskListService().execute(
            user_id=user_id,
            search=search,
        )

    def list(self, request):
        try:
            tasks_queryset = self.filter_queryset(self.get_tasks_queryset())

            tasks_page = self.paginate_queryset(tasks_queryset)

            if tasks_page is not None:
                return self.get_paginated_response(TaskSerializer(tasks_page, many=True).data)

            return Response(
                TaskSerializer(tasks_queryset, many=True).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": "Ocorreu um erro ao processar a requisição."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
