from django.urls import path
from .views import TaskListViewSet
from .views import TaskCreateViewSet
from .views import TaskUpdateViewSet

urlpatterns = [
    path('tasks/', TaskListViewSet.as_view({'get': 'list'}), name='task-list'),
    path('tasks/create/', TaskCreateViewSet.as_view({'post': 'create'}), name='task-create'),
    path('tasks/update/', TaskUpdateViewSet.as_view({'put': 'update'}), name='task-create'),
]
