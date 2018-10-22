import {Component} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material';
import {AuthenticationService} from './services/authentication.service';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {Task, TaskDialog} from './models/models';
import {TaskService} from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = 'Todolist';

  isLogIn: boolean = false;
  isLoggedIn$: Observable<boolean>;

  task = new Task();

  constructor(private authService: AuthenticationService,
              private taskService: TaskService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.isLoggedIn.subscribe((res) => {
      this.isLogIn = res;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  addNewTask() {
    let taskDialog = new TaskDialog();
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: taskDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.task = result;
      this.taskService.createTask(this.task).subscribe((res) => {});
    });
  }
}
