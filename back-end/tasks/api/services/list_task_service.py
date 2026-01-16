from api.models import Task

class ListTaskService:
    def execute(self, user_id, team_id=None, is_manager=False):
        repo = Task.objects

        if is_manager and team_id:
            return repo.by_team(team_id)

        if team_id:
            return repo.by_user_in_team(user_id, team_id)

        return repo.by_user_without_team(user_id)
