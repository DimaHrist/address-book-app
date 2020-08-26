// Modules
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// Services
import {ApiService} from '../../services/api.service';

// Interfaces
import {IRequest} from '../../interfaces/request-interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Output() dataSourceChange = new EventEmitter<IRequest[]>();

  // Create form
  public form = new FormGroup({
    lastName: new FormControl(null, Validators.required),
    firstName: new FormControl(),
    patronymic: new FormControl(),
    phone: new FormControl(null, Validators.required)
  });


  constructor(
    private readonly apiService: ApiService
  ) { }

  // Add item method
  public addItem(): void {
    const request: IRequest = {
      rate: false,
      last_name: this.form.controls.lastName.value,
      first_name: this.form.controls.firstName.value,
      patronymic: this.form.controls.patronymic.value,
      phone: this.form.controls.phone.value
    };

    this.apiService.addItem(request).subscribe((data: IRequest[]) => {
      this.dataSourceChange.emit(data);
      this.form.reset();
    });
  }

  ngOnInit(): void {
  }

}
