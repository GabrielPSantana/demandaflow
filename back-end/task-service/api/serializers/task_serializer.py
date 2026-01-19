from rest_framework import serializers
from ..models import Task


class TaskSerializer(serializers.ModelSerializer):

    title = serializers.CharField(
        min_length=5,
        max_length=30,
        error_messages={
            "min_length": "Título deve ter no mínimo 5 caracteres",
            "max_length": "Título deve ter no máximo 30 caracteres",
            "required": "Título é obrigatório"
        }
    )

    description = serializers.CharField(
        min_length=3,
        max_length=250,
        error_messages={
            "min_length": "Descrição deve ter no mínimo 3 caracteres",
            "max_length": "Descrição deve ter no máximo 250 caracteres",
            "required": "Descrição é obrigatória"
        }
    )

    priority = serializers.ChoiceField(
        choices=Task.Priority.choices,
        error_messages={
            "invalid_choice": "Prioridade inválida",
            "required": "Prioridade é obrigatória"
        }
    )

    status = serializers.ChoiceField(
        choices=Task.Status.choices,
        error_messages={
            "invalid_choice": "Status inválido",
            "required": "Status é obrigatório"
        }
    )

    start_datetime = serializers.DateTimeField(
        input_formats=[
            "%Y-%m-%dT%H:%M",
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%dT%H:%M:%SZ",
        ],
        required=False,
        allow_null=True,
        error_messages={
            "invalid": "Data inicial inválida"
        }
    )

    end_datetime = serializers.DateTimeField(
        input_formats=[
            "%Y-%m-%dT%H:%M",
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%dT%H:%M:%SZ",
        ],
        required=False,
        allow_null=True,
        error_messages={
            "invalid": "Data final inválida"
        }
    )


    class Meta:
        model = Task
        fields = [
            'task_id', 'title', 'description', 'priority',
            'status', 'start_datetime', 'end_datetime',
            'time_spent', 'team_id'
        ]
