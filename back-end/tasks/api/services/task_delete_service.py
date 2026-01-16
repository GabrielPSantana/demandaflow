from api.models import Task
from .task_service import TaskService
from django.core.exceptions import ValidationError

class TaskDeleteService(TaskService):
    def execute(self, task_id: str, user_id: int):
        try:

            task = Task.objects.by_task_id_and_user_id(task_id, user_id)

            if not task:
                raise ValidationError("O recurso solicitado não foi encontrado.")

            task.published = False
            task.save()

        except ValidationError as error:
            raise error

        except Exception as error:
            print(f"Erro técnico: {error}")
            raise Exception("Ocorreu um erro interno ao processar a solicitação.")