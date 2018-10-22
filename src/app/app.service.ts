import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {snackBar} from './models/models';

@Injectable()
export class AppService {

  snackBar: snackBar;

  constructor(private http: HttpClient) {
    this.snackBar = new snackBar();
  }

}