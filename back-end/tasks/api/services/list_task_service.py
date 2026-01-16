from api.models import Task

class ListTaskService:
    def execute(self, user_id, team_id=None, is_manager=False):
        try:
            task_repository = Task.objects

            if is_manager and team_id:
                return task_repository.by_team(team_id)

            if team_id:
                return task_repository.by_user_in_team(user_id, team_id)

            return task_repository.by_user_without_team(user_id)

        except Exception as e:
            raise Exception("Erro ao listar tasks.")
