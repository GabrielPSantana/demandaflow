from abc import ABC, abstractmethod

class TaskService(ABC):
    @abstractmethod
    def execute(self, **kwargs):
        pass