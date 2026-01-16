from django.urls import path
from api import views
from api.views import TaskViewSet

urlpatterns = [
    path('tasks/', TaskViewSet.as_view({'get': 'list'}), name='task-list'),
    
]