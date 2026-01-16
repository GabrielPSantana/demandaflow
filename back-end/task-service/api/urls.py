from django.urls import path
from .views import TaskListViewSet, TaskCreateViewSet, TaskUpdateViewSet, TaskDeleteViewSet

urlpatterns = [
    path('tasks/', TaskListViewSet.as_view({'get': 'list'}), name='task-list'),
    path('tasks/create/', TaskCreateViewSet.as_view({'post': 'create'}), name='task-create'),
    path('tasks/update/', TaskUpdateViewSet.as_view({'put': 'update'}), name='task-update'),
    path('tasks/delete/', TaskDeleteViewSet.as_view({'delete': 'destroy'}), name='task-destroy'),
]
