from django.urls import path, include
from api.swagger import schema_view

urlpatterns = [
    path('api/v1/', include('api.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
