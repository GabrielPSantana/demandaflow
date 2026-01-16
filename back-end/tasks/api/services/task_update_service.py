from api.models import Task
from django.core.exceptions import ValidationError
from .task_service import TaskService
from ..utils.time_spent_util import time_spent_util
from django.core.exceptions import ValidationError

class TaskUpdateService(TaskService):
    def execute(
        self,
        task_id,
        team_id,
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

            if not task:
                raise ValidationError("O recurso solicitado não foi encontrado.")


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

        except ValidationError as error:
            raise error

        except Exception as e:
            raise ValidationError("Ocorreu um erro ao atualizar a task")