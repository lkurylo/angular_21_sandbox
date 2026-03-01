import { Component } from '@angular/core';
import { NewTask } from '../new-task/new-task';
import { TasksListComponent } from '../tasks-list/tasks-list';
import { TaskStats } from '../task-stats/task-stats';

@Component({
  selector: 'app-task-manager',
  imports: [TasksListComponent, NewTask, TaskStats],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager {
}
