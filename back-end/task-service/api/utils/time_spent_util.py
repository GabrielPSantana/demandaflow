from datetime import datetime
from django.core.exceptions import ValidationError

def time_spent_util(start_datetime, end_datetime):
    try:
        start_datetime = datetime.fromisoformat(start_datetime)
        end_datetime = datetime.fromisoformat(end_datetime)

        time_spent = end_datetime - start_datetime

        return time_spent
    except ValueError as e:
        raise ValidationError("Formato inválido de data/hora")