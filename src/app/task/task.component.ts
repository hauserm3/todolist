import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import {MatDialog} from '@angular/material';
import {Task, TaskDialog} from '../models/models';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskList: Task[] = [];
  task = new Task();

  constructor(private taskService: TaskService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getTasks();
    this.taskService.taskListSub.subscribe(() => this.getTasks());
  }

  getTasks(){
    this.taskService.getTasks().subscribe((res: Task[]) => {
      this.taskList = res;
    });
  }

  editTaskDialog(task: Task) {
    let taskDialog = new TaskDialog();
    taskDialog.edit = true;
    Object.assign(taskDialog.task, task);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: taskDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.task = result;
      this.editTask(this.task)
    });
  }

  editTask(task) {
    this.taskService.editTask(task).subscribe((res) => {
      this.getTasks();
    });
  }

  deleteTask(task: Task) {
    let taskDialog = new TaskDialog();
    taskDialog.delete = true;
    taskDialog.task = task;
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: taskDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.task = result;
      this.taskService.deleteTask(this.task).subscribe((res) => {
        this.getTasks();
      });
    });
  }

  someFunc(ad: string) {
    return ad;
  }

}
