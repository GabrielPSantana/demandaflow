from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response

from ..services import TaskDeleteService
from .task_view_set import TaskViewSet

class TaskDeleteViewSet(TaskViewSet):
    def destroy(self, request, task_id):
        user_id='d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b'

        try:
            TaskDeleteService().execute(
                user_id=user_id,
                task_id=task_id
            )
            
            return Response(status=status.HTTP_204_NO_CONTENT)

        except ValidationError as e:
            return Response(
                {"error": "Registro não encontrado."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"error": f'Ocorreu um erro ao processar a requisição.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
