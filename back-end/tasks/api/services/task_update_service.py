from api.models import Task
from datetime import datetime
from django.core.exceptions import ValidationError
from .task_service import TaskService
from ..utils import time_spent_util 

class TaskUpdateService(TaskService):
    def execute(
        self,
        task_id,
        user_id,
        title,
        description,
        priority,
        status,
        start_datetime,
        end_datetime,
        time_spent,
    ):
        try:
            task = Task.objects.by_task_id_and_user_id(task_id, user_id)

            if (start_datetime and end_datetime) and not time_spent:
                time_spent = time_spent_util(start_datetime, end_datetime)

            task.title = title
            task.description = description
            task.priority = priority
            task.status = status
            task.start_datetime = start_datetime
            task.end_datetime = end_datetime
            task.time_spent = time_spent

            task.full_clean()
            task.save()

            return task

        except ValidationError:
            raise
        except Exception as e:
            raise ValidationError(f"Ocorreu um erro ao atualizar a task")