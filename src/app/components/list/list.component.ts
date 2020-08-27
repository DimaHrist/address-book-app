// Modules
import { Component } from '@angular/core';

// Services
import { ApiService } from '../../services/api.service';

// Interfaces
import { IMember } from '../../interfaces/member-interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  // Array for table
  public dataSource = new MatTableDataSource<IMember>([]);

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
  ) {
  }

  // Get items
  public getItems(data: IMember[]): void {
    this.dataSource = new MatTableDataSource<IMember>(data);
  }

  // Change item rate
  public rateItem(value: boolean, id: number): void {
    this.apiService.rateItem(value, id).subscribe((data) => {
      this.dataSource = new MatTableDataSource<IMember>(data);
    });
  }

  // Delete item
  public deleteItem(id: number): void {
    this.apiService.deleteItem(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource<IMember>(data);
    });
  }

}
