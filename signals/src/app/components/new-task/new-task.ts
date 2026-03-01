import { Component, signal, model, output, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss',
})
export class NewTask {
  // two ways to do the same action
  // to compare
  title = model<string>('');
  description = signal<string>('');
  editMode = signal<boolean>(false);

  taskToEdit = input<Task | undefined, any>(undefined, {
    transform: (value: Task | undefined) => {
      if (value) {
        this.title.set(value.title);
        this.description.set(value.description || '');
        debugger;
        this.editMode.set(true);
      }

      return value;
    },
  });

  onTaskCreated = output<Task>();
  onTaskEdited = output<Task | null>();

  addTask() {
    this.onTaskCreated.emit({
      id: -1,
      title: this.title(),
      description: this.description(),
    } as Task);

    this.title.set('');
    this.description.set('');
  }

  canAddTask = computed(() => {
    return this.title() !== '' && this.description() !== '';
  });

  editTask() {
    debugger;
    this.onTaskEdited.emit({
      id: this.taskToEdit()!.id,
      title: this.title(),
      description: this.description(),
      done: false,
    } as Task);

    this.cleanField();
  }

  cancelEdit() {
    this.cleanField();

    this.onTaskEdited.emit(null);
  }

  cleanField() {
    this.title.set('');
    this.description.set('');
    this.editMode.set(false);
  }
}
