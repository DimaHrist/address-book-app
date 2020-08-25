import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

// Interfaces
import {IRequest} from '../interfaces/request-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public dataSource = [];

  constructor() { }

  public addItem(request: IRequest): Observable<any> {
    this.dataSource.push(request);
    return of(this.dataSource);
  }
  //
  // public deleteItem() {
  // }
  //
  // public rateItem() {
  // }
}
