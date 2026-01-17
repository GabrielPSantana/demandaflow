from rest_framework import status
from rest_framework.response import Response
from ..services import TaskDeleteService # Importante garantir que esteja no __init__ de services
from .task_view_set import TaskViewSet
from django.core.exceptions import ValidationError

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskDeleteViewSet(TaskViewSet):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['user_id', 'task_id'],
            properties={
                'user_id': openapi.Schema(type=openapi.TYPE_STRING, description='UUID do usuário'),
                'task_id': openapi.Schema(type=openapi.TYPE_STRING, description='UUID da task'),
            },
        ),
    )
    
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
                {"error": f'Ocorreu um erro ao processar a requisição. {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
