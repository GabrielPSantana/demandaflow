from rest_framework.filters import OrderingFilter

class DefaultOrderingFilter(OrderingFilter):
    ordering_fields = [
        "created_at",
        "title",
        "priority",
        "start_datetime",
        "end_datetime",
    ]
    
    ordering = ["-created_at"]
