from django.urls import path
from api.views import TaskListViewSet

urlpatterns = [
    path('tasks/', TaskListViewSet.as_view({'get': 'list'}), name='task-list'),
    
]