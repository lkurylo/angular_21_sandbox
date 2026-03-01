import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksListComponent {
  protected taskService = inject(TaskService);

  tasks = this.taskService.allTasks;
  taskToEdit = this.taskService.taskToEdit;

  toggleTaskDone(id: number) {
    this.taskService.toggleTaskDone(id);
  }

  editTask(event: Event, id: number) {
    event.stopImmediatePropagation();

    this.taskService.editTask(id);
  }
}
