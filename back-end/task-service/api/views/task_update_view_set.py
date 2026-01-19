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


            serializer = TaskSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            task = TaskUpdateService().execute(
                user_id=user_id,
                task_id=task_id,
                title=serializer.data['title'],
                description=serializer.data['description'],
                priority=serializer.data['priority'],
                status=serializer.data['status'],
                start_datetime=serializer.data['start_datetime'],
                end_datetime=serializer.data['end_datetime'],
            )

            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)


        except ValidationError as error:
            return Response(
                {"error": f'Dados inválidos para a criação da task. {error}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as error:

            return Response(
                {"error": f"Ocorreu um erro interno ao processar a requisição.{error}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
