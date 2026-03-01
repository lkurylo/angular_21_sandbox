import { Component, model, signal } from '@angular/core';
import { NewTask } from '../new-task/new-task';
import { TasksListComponent } from '../tasks-list/tasks-list';
import { Task } from '../../models/task';
import { TaskStats } from '../task-stats/task-stats';

@Component({
  selector: 'app-task-manager',
  imports: [TasksListComponent, NewTask, TaskStats],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager {
  allTasks = signal<Task[]>([
    { id: 1, title: 'first task', description: undefined, done: false },
    { id: 2, title: 'second task', description: 'desc', done: true },
  ]);
  taskToEdit = signal<Task | undefined>(undefined);

  addedTask(task: Task) {
    this.allTasks.update((tasks) => [...tasks, { ...task, id: tasks.length + 1 }]);
  }

  editTask(id: number) {
    this.taskToEdit.set(this.allTasks().find((x) => x.id === id));
  }

  editedTask(task: Task | null) {
    if (task) {
      this.allTasks.update((tasks) =>
        tasks.map((x) =>
          x.id === task.id ? { ...x, title: task.title, description: task.description } : x,
        ),
      );
    }

    this.taskToEdit.set(undefined);
  }
}
