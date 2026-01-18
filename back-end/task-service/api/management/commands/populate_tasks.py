import random
import uuid
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import lorem_ipsum, timezone

from api.models import Task


class Command(BaseCommand):
    help = 'Populates the Task model with 50 dummy records'

    def handle(self, *args, **kwargs):
        priorities = [choice[0] for choice in Task.Priority.choices]
        statuses = [choice[0] for choice in Task.Status.choices]
        
        titles = [
            "Reunião de planejamento",
            "Desenvolver endpoint de API",
            "Testar formulário de login",
            "Atualizar documentação do projeto",
            "Revisar código do pull request",
            "Implementar autenticação JWT",
            "Corrigir bug no frontend",
            "Criar relatório semanal",
            "Configurar ambiente de testes",
            "Deploy da versão de produção"
        ]

        tasks_to_create = []

        for _ in range(50):
            start_dt = timezone.now() - timedelta(
                days=random.randint(0, 30),
                hours=random.randint(0, 23)
            )

            duration = timedelta(hours=random.randint(1, 8))
            end_dt = start_dt + duration

            task = Task(
                title=random.choice(titles), 
                description=lorem_ipsum.paragraph(),
                priority=random.choice(priorities),
                status=random.choice(statuses),
                published=random.choice([True, False]),
                start_datetime=start_dt,
                end_datetime=end_dt,
                time_spent=duration,
                user_id = "d4f7c2a8-3e5b-4f1d-9b2a-6c8f1a2e7d9b",
                team_id=random.choice([uuid.uuid4(), None])
            )

            tasks_to_create.append(task)

        Task.objects.bulk_create(tasks_to_create)

        self.stdout.write(
            self.style.SUCCESS('Successfully created 50 tasks!')
        )
