from api.models import Task
from .task_service import TaskService
from django.core.exceptions import ValidationError

class TaskListService(TaskService):
    def execute(self, user_id, search):
        try:
            return Task.objects.by_title(user_id, search)
        
        except ValidationError as error:
            raise error
        
        except Exception as e:
            raise Exception(f'Erro ao listar a task. {e}')