from api.models import Task
from datetime import datetime
from django.core.exceptions import ValidationError
from .task_service import TaskService
from ..utils.time_spent_util import time_spent_util

class TaskCreateService(TaskService):
    def execute(
        self,
        user_id,
        title,
        description,
        priority,
        status,
        start_datetime,
        end_datetime,
    ):
        try:
            if start_datetime and end_datetime:
                time_spent = time_spent_util(start_datetime, end_datetime)

            task = Task(
                user_id=user_id,
                title=title,
                description=description,
                priority=priority,
                status=status,
                start_datetime=start_datetime,
                end_datetime=end_datetime,
                time_spent=time_spent,
                published=True
            )

            task.full_clean()

            task.save()
            return task
            
        except ValidationError as error:
            raise error

        except Exception as e:

            raise Exception(f'Ocorreu um erro interno ao processar a criação da task.{e}')