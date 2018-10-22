import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task, TaskDialog} from '../models/models';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  task = new Task();

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskDialog: TaskDialog
  ) {
    this.task = this.taskDialog.task;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
