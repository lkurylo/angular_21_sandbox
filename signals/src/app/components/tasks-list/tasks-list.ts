import { Component, input, model, output, signal } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksListComponent {
  tasks = model<Task[]>();
  onEditTask = output<number>();
  taskToEdit = input<Task>();

  toggleTaskDone(id: number) {
    this.tasks.update((t) =>
      (t || []).map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  editTask(event: Event, id: number) {
    event.stopImmediatePropagation();

    this.onEditTask.emit(id);
  }
}
