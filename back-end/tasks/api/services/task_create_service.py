from api.models import Task
from datetime import datetime
from django.core.exceptions import ValidationError
from .task_service import TaskService

class CreateTaskService(TaskService):
    def execute(
        self,
        user_id,
        title,
        description,
        team_id,
        priority,
        status',
        start_datetime,
        end_datetime,
        time_spent,
        published=True
    ):
        try:
            if start_datetime and end_datetime:
                try:
                    start_str = start_datetime
                    end_str = end_datetime

                    start_datetime = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
                    end_datetime = datetime.fromisoformat(end_str.replace("Z", "+00:00"))

                except ValueError as e:
                    raise ValidationError(f"Formato inválido de data/hora: {e}")

                time_spent = end_datetime - start_datetime

            task = Task.objects.create(
                user_id=user_id,
                title=title,
                description=description,
                team_id=team_id,
                priority=priority,
                status=status,
                start_datetime=start_datetime,
                end_datetime=end_datetime,
                time_spent=time_spent,
                published=published
            )

            return task

        except Exception as e:
            raise ValidationError(f"Ocorreu um erro ao criar a task: {e}")
