// Modules
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

// Services
import {ApiService} from '../../services/api.service';
import {FormControl, FormGroup} from '@angular/forms';

// Interfaces
import {IRequest} from '../../interfaces/request-interface';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  // Array for table
  public dataSource = new MatTableDataSource<IRequest>([]);

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

  // Get items
  public getItems(data: IRequest[]): void {
    this.dataSource = new MatTableDataSource<IRequest>(data);
  }

  // Change item rate
  public rateItem(value: boolean, id: number): void {
    this.apiService.rateItem(value, id).subscribe((data) => {
      this.dataSource = new MatTableDataSource<IRequest>(data);
    });
  }

  // Delete item
  public deleteItem(id: number): void {
    this.apiService.deleteItem(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource<IRequest>(data);
    });
  }

  ngOnInit(): void {
  }

}
