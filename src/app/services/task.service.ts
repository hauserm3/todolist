import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs/index';
import {Task} from '../models/models';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
export class TaskService {

  taskListSub = new Subject();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get('/api/tasks')
      .pipe(
        catchError(this.handleError)
      );
  }

  createTask(task: Task): Observable<any> {
    return this.http.post('/api/tasks', task)
      .pipe(
        map((res: Task) => {
          let taskRes = new Task();
          taskRes = { userId: res.userId, _id: res._id, task: res.task, completed: res.completed};
          this.taskListSub.next();
          return taskRes;
        }),
        catchError(this.handleError)
      );
  }

  editTask(task: Task): Observable<any> {
    return this.http.put(`/api/tasks/${task._id}`, {task: task.task, completed: task.completed})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete(`/api/tasks/${task._id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    const errMsg = error.error ? error.error.message : error.error;
    return throwError(errMsg);
  }

}
