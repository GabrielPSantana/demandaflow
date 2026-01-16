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
    
    def destroy(self, request):
            data_request = request.data

            if not data_request.get('user_id') or not data_request.get('task_id'):
                return Response(
                    {"error": "Campos inválidos."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                TaskDeleteService().execute(
                    user_id=data_request.get('user_id'),
                    task_id=data_request.get('task_id')
                )
                
                return Response(status=status.HTTP_204_NO_CONTENT)

            except ValidationError as e:
                return Response(
                    {"error": "Registro não encontrado."}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            except Exception as e:
                return Response(
                    {"error": "Ocorreu um erro ao processar a requisição."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )