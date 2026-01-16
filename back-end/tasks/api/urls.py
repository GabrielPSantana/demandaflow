from django.urls import path
from .views import TaskListViewSet
from .views import TaskCreateViewSet

urlpatterns = [
    path('tasks/', TaskListViewSet.as_view({'get': 'list'}), name='task-list'),
    path('tasks/create/', TaskCreateViewSet.as_view({'post': 'create'}), name='task-create'),
]
