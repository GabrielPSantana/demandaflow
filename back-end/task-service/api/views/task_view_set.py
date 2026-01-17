from abc import ABC
from rest_framework.viewsets import GenericViewSet
from .pagination import DefaultPagination
from .filters import DefaultOrderingFilter

class TaskViewSet(ABC, GenericViewSet):
    pagination_class = DefaultPagination
    filter_backends = [DefaultOrderingFilter]
