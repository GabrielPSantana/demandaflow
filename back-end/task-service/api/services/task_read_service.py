from api.models import Task
from .task_service import TaskService
from django.core.exceptions import ValidationError

class TaskReadService(TaskService):
    def execute(self, user_id, task_id, is_manager):
        try:

            task = Task.objects.by_task_id_and_user_id(task_id, user_id )

            if not task:
                raise ValidationError("O recurso solicitado não foi encontrado.")
    
            return task
        
        except ValidationError as error:
            raise error

        except Exception as e:
            raise Exception("Erro ao listar a task.")
