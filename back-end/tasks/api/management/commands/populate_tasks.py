import random
import uuid
from datetime import datetime, timedelta

from django.core.management.base import BaseCommand
from django.utils import lorem_ipsum
from api.models import Tasks


class Command(BaseCommand):
    help = 'Populates the Tasks model with 50 dummy records'

    def handle(self, *args, **kwargs):
        priorities = [choice[0] for choice in Tasks.Priority.choices]
        statuses = [choice[0] for choice in Tasks.Status.choices]

        tasks_to_create = []

        for _ in range(50):
            start_dt = datetime.now() - timedelta(days=random.randint(0, 30), hours=random.randint(0, 23))
            duration = timedelta(hours=random.randint(1, 8))
            end_dt = start_dt + duration

            task = Tasks(
                title=lorem_ipsum.words(3),
                description=lorem_ipsum.paragraph(),
                priority=random.choice(priorities),
                status=random.choice(statuses),
                start_datetime=start_dt,
                end_datetime=end_dt,
                time_spent=duration,
                team_id=uuid.uuid4()
            )
            tasks_to_create.append(task)

        Tasks.objects.bulk_create(tasks_to_create)

        self.stdout.write(self.style.SUCCESS('Successfully created 50 tasks!'))
