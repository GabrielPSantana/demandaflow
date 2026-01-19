from rest_framework.response import Response
from rest_framework import status
from ..serializers import TaskSerializer
from ..services import TaskListService
from .task_view_set import TaskViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.exceptions import ValidationError

class TaskListViewSet(TaskViewSet):
    def get_queryset(self):
        search = self.request.query_params.get("search")

        user_id = "d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b"

        return TaskListService().execute(
            user_id=user_id,
            search=search,
        )

    def list(self, request):
        try:
            queryset = self.filter_queryset(self.get_queryset())

            tasks_paginated = self.paginate_queryset(queryset)

            if tasks_paginated is not None:
                return self.get_paginated_response(TaskSerializer(tasks_paginated, many=True).data)

            return Response(
                TaskSerializer(queryset, many=True).data,
                status=status.HTTP_200_OK
            )

        except ValidationError as e:
            return Response(
                {"error": "Registro não encontrado."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        except Exception as e:
            return Response(
                {"error": f'Ocorreu um erro ao processar a requisição. {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
