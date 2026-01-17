from django.urls import path
from .views import TaskListViewSet, TaskCreateViewSet,TaskReadViewSet, TaskUpdateViewSet, TaskDeleteViewSet

urlpatterns = [
    path('tasks/', TaskListViewSet.as_view({'get': 'list'}), name='task-list'),
    path('tasks/<uuid:task_id>/', TaskReadViewSet.as_view({'get': 'retrieve'}), name='task-detail'),
    path('tasks/create/', TaskCreateViewSet.as_view({'post': 'create'}), name='task-create'),
    path('tasks/update/<uuid:task_id>/', TaskUpdateViewSet.as_view({'put': 'update'}), name='task-update'),
    path('tasks/delete/<uuid:task_id>/', TaskDeleteViewSet.as_view({'delete': 'destroy'}), name='task-destroy'),
]
