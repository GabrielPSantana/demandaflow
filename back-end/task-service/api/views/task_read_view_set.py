from rest_framework.response import Response
from rest_framework import status
from ..serializers import TaskSerializer
from ..services import TaskReadService
from .task_view_set import TaskViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.exceptions import ValidationError

class TaskReadViewSet(TaskViewSet):

    def retrieve(self, request, task_id):
        try:
            user_id='d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b'

            is_manager=True

            tasks = TaskReadService().execute(
                user_id=user_id,
                task_id=task_id,
                is_manager=is_manager,
            )

            return Response(
                TaskSerializer(tasks).data,
                status=status.HTTP_200_OK
            )

        except ValidationError as e:
            return Response(
                {"error": "Registro não encontrado. 2"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        except Exception as e:
            return Response(
                {"error": f'Ocorreu um erro ao processar a requisição. {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )