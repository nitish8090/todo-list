from django.db import models

# Create your models here.


class Todo(models.Model):

    STATUS_TODO = 'todo'
    STATUS_INPROGRESS = 'in_progress'
    STATUS_DONE = 'done'
    STATUS_CHOICES = [
        (STATUS_TODO, 'Todo'),
        (STATUS_INPROGRESS, 'In Progress'),
        (STATUS_DONE, 'Done'),
    ]

    id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
