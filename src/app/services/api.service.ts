import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

// Interfaces
import {IRequest} from '../interfaces/request-interface';
import {findIndex} from 'rxjs/operators';

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

  public deleteItem(id: number): Observable<any> {
    this.dataSource.splice(id, 1);
    return of(this.dataSource);
  }

  public rateItem(value: boolean, id: number): Observable<any> {
    const test = this.dataSource.find((item) => {
      return this.dataSource.indexOf(item) === id;
    });
    if (value) {
      this.dataSource.unshift({...test, rate: value});
      this.dataSource.splice((id + 1), 1);
    } else {
      this.dataSource.push({...test, rate: value});
      this.dataSource.splice((id), 1);
    }
    return of(this.dataSource);
  }
}
