from rest_framework import status
from rest_framework.response import Response
from ..serializers.task_serializer import TaskSerializer
from ..services.task_update_service import TaskUpdateService
from .task_view_set import TaskViewSet

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
        data = request.data

        if not data.get('user_id') and not data.get('task_id'):
            return Response(
                {"error": "Campos inválidos."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            task = TaskUpdateService().execute(
                user_id=data.get('user_id'),
                task_id=data.get('task_id'),
                title=data.get('title'),
                description=data.get('description'),
                team_id=data.get('team_id'),
                priority=data.get('priority'),
                status=data.get('status'),
                start_datetime=data.get('start_datetime'),
                end_datetime=data.get('end_datetime'),
                time_spent=data.get('time_spent'),
            )

            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": "Ocorreu um erro ao processar a requisição."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

