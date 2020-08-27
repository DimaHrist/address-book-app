import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

// Interfaces
import {IMember} from '../interfaces/member-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public dataSource = [];

  constructor() { }

  public addItem(request: IMember): Observable<any> {
    this.dataSource.push(request);
    return of(this.dataSource);
  }

  public deleteItem(id: number): Observable<any> {
    this.dataSource.splice(id, 1);
    return of(this.dataSource);
  }

  public rateItem(value: boolean, id: number): Observable<any> {
    const rateItem = this.dataSource.find((item, index) => {
      return index === id;
    });
    if (value) {
      this.dataSource.unshift({...rateItem, rate: value});
      this.dataSource.splice((id + 1), 1);
    } else {
      this.dataSource.push({...rateItem, rate: value});
      this.dataSource.splice((id), 1);
    }
    return of(this.dataSource);
  }
}
