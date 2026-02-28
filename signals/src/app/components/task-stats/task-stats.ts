import { Component, computed, input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.scss',
})
export class TaskStats {
  tasks = input<Task[]>([]);

  tasksDone = computed(() => this.tasks().filter((x) => x.done).length);
}
