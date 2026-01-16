from rest_framework import status
from rest_framework.response import Response
from ..serializers.task_serializer import TaskSerializer
from ..services.task_update_service import TaskUpdateService
from .task_view_set import TaskViewSet
from django.core.exceptions import ValidationError

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskUpdateViewSet(TaskViewSet):
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

    def update(self, request):
        data_request = request.data

        if not data_request.get('user_id') and not data_request.get('task_id'):
            return Response(
                {"error": "Campos inválidos."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            task = TaskUpdateService().execute(
                user_id=data_request.get('user_id'),
                task_id=data_request.get('task_id'),
                title=data_request.get('title'),
                description=data_request.get('description'),
                team_id=data_request.get('team_id'),
                priority=data_request.get('priority'),
                status=data_request.get('status'),
                start_datetime=data_request.get('start_datetime'),
                end_datetime=data_request.get('end_datetime'),
                time_spent=data_request.get('time_spent'),
            )

            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)

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
