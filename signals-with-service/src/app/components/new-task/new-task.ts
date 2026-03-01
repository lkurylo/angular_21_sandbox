import { Component, signal, computed, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss',
})
export class NewTask {
  protected taskService = inject(TaskService);

  title = signal<string>('');
  description = signal<string>('');
  editMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      const task = this.taskService.taskToEdit();

      if (task) {
        this.title.set(task.title);
        this.description.set(task.description || '');
        this.editMode.set(true);
      } else {
        this.cleanField();
      }
    });
  }

  addTask() {
    this.taskService.addedTask(
      {
        id: -1,
        title: this.title(),
        description: this.description(),
      } as Task,
    );

    this.cleanField();
  }

  canAddTask = computed(() => {
    return this.title() !== '' && this.description() !== '';
  });

  editTask() {
    this.taskService.editedTask(
      {
        id: this.taskService.taskToEdit()!.id,
        title: this.title(),
        description: this.description(),
        done: false,
      } as Task,
    );

    this.cleanField();
  }

  cancelEdit() {
    this.cleanField();

    this.taskService.taskToEdit.set(undefined);
  }

  cleanField() {
    this.title.set('');
    this.description.set('');
    this.editMode.set(false);
  }
}
