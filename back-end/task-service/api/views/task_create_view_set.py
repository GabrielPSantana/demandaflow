from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from ..serializers import TaskSerializer
from ..services import TaskCreateService
from .task_view_set import TaskViewSet

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskCreateViewSet(TaskViewSet):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['user_id', 'title'],
            properties={
                'user_id': openapi.Schema(type=openapi.TYPE_STRING, description='UUID do usuário'),
                'team_id': openapi.Schema(type=openapi.TYPE_STRING, description='UUID do time', default=None),
                'title': openapi.Schema(type=openapi.TYPE_STRING, description='Título da task'),
                'description': openapi.Schema(type=openapi.TYPE_STRING, description='Descrição da task', default=''),
                'priority': openapi.Schema(type=openapi.TYPE_STRING, description='LOW, MEDIUM, HIGH, CRITICAL', default='LOW'),
                'status': openapi.Schema(type=openapi.TYPE_STRING, description='PENDING, IN_PROGRESS, COMPLETED', default='PENDING'),
                'start_datetime': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME, description='Data/hora de início', default=None),
                'end_datetime': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME, description='Data/hora de término', default=None),
                'time_spent': openapi.Schema(type=openapi.TYPE_STRING, description='Tempo gasto (HH:MM:SS)', default=None),
            },
        ),
        responses={201: TaskSerializer}
    )

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