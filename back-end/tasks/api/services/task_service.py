from django.shortcuts import get_object_or_404
from api.models import Task

class TaskService:
    @staticmethod
    def list_tasks():
        return Task.objects.all()

    @staticmethod
    def get_task(tasks_id):
        return get_object_or_404(Task, tasks_id=tasks_id)

    @staticmethod
    def create_task(data):
        return Task.objects.create(**data)

    @staticmethod
    def update_task(task, data):
        for field, value in data.items():
            setattr(task, field, value)
        task.save()
        return task

    @staticmethod
    def delete_task(task):
        task.delete()
