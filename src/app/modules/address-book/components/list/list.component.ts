// Modules
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

// Services
import {ApiService} from '../../services/api.service';
import {FormControl, FormGroup} from '@angular/forms';

// Interfaces
import {IRequest} from '../../interfaces/request-interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  // Array for table
  public dataSource: IRequest[];

  // Displayed columns of table
  public displayedColumns = [
    'rate',
    'lastName',
    'firstName',
    'patronymic',
    'phone',
    'delete'
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  public getItems(data: IRequest[]): void {
    this.dataSource = data;
    console.log(this.dataSource);
  }

  ngOnInit(): void {
  }

}
