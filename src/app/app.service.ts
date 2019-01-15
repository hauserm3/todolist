import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnackBar} from './models/models';

@Injectable()
export class AppService {

  snackBar: SnackBar;

  constructor(private http: HttpClient) {
    this.snackBar = new SnackBar();
  }

}
