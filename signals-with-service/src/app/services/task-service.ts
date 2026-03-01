import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private allTasksSignal = signal<Task[]>([
    { id: 1, title: 'first task', description: undefined, done: false },
    { id: 2, title: 'second task', description: 'desc', done: true },
  ]);

  allTasks = this.allTasksSignal.asReadonly();
  taskToEdit = signal<Task | undefined>(undefined);

  tasksDone = computed(() => this.allTasksSignal().filter((x) => x.done).length);

  addedTask(task: Task) {
    this.allTasksSignal.update((tasks) => [...tasks, { ...task, id: tasks.length + 1 }]);
  }

  editTask(id: number) {
    this.taskToEdit.set(this.allTasksSignal().find((x) => x.id === id));
  }

  editedTask(task: Task) {
    this.allTasksSignal.update((tasks) =>
      tasks.map((x) =>
        x.id === task.id ? { ...x, title: task.title, description: task.description } : x,
      ),
    );

    this.taskToEdit.set(undefined);
  }

  toggleTaskDone(id: number) {
    this.allTasksSignal.update((t) =>
      (t || []).map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }
}
