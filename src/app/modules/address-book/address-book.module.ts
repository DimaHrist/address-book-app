// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressBookRoutingModule} from './address-book-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

// Components
import {
  ListComponent,
  AddComponent
} from './components';


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressBookRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddressBookModule { }
