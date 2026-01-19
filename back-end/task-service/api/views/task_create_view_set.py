from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from ..serializers import TaskSerializer
from ..services import TaskCreateService
from .task_view_set import TaskViewSet

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskCreateViewSet(TaskViewSet):
    def create(self, request):
        data_request = request.data

        user_id='d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b'  
        
        if not user_id or not data_request.get('title'):
            return Response(
                {"error": "Campos inválidos."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            task = TaskCreateService().execute(
                user_id=user_id,
                title=data_request.get('title'),
                description=data_request.get('description'),
                team_id=data_request.get('team_id'),
                priority=data_request.get('priority'),
                status=data_request.get('status'),
                start_datetime=data_request.get('start_datetime'),
                end_datetime=data_request.get('end_datetime'),
                time_spent=data_request.get('time_spent'),
            )
            
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)

        except ValidationError as error:
            return Response(
                {"error": f'Dados inválidos para a criação da task. {error}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as error:

            return Response(
                {"error": "Ocorreu um erro interno ao processar a requisição."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )