import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.scss',
})
export class TaskStats {
  protected taskService = inject(TaskService);
}
