// Modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Inputmask from 'inputmask';

// Services
import { ApiService } from '../../services/api.service';

// Interfaces
import { IMember } from '../../interfaces/member-interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Output() dataSourceChange = new EventEmitter<IMember[]>();

  // Create form
  public form = new FormGroup({
    lastName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(),
    patronymic: new FormControl(),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^\\+[7]\\([0-9][0-9][0-9]\\)[0-9][0-9][0-9]\\-[0-9][0-9]\\-[0-9][0-9]$')

    ])
  });


  constructor(
    private readonly apiService: ApiService,
) { }

  // Add item method
  public addItem(): void {
    const request: IMember = {
      rate: false,
      last_name: this.form.controls.lastName.value,
      first_name: this.form.controls.firstName.value,
      patronymic: this.form.controls.patronymic.value,
      phone: this.form.controls.phone.value
    };

    this.apiService.addItem(request).subscribe((data: IMember[]) => {
      this.dataSourceChange.emit(data);
      this.form.reset();
    });

  }

  public addMask(): void {
    Inputmask('+7(999)999-99-99').mask(document.getElementById('phone'));
  }

  ngOnInit(): void {
    this.addMask();
  }

}
