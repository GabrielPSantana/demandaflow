from rest_framework import status
from rest_framework.response import Response
from ..serializers.task_serializer import TaskSerializer
from ..services.task_update_service import TaskUpdateService
from .task_view_set import TaskViewSet
from django.core.exceptions import ValidationError

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskUpdateViewSet(TaskViewSet):

    def update(self, request, task_id):
        data_request = request.data

        try:
            user_id='d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b'

            task = TaskUpdateService().execute(
                user_id=user_id,
                task_id=task_id,
                title=data_request.get('title'),
                description=data_request.get('description'),
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
