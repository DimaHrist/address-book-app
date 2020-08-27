import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ListComponent } from './list.component';
import {Component, EventEmitter, Output} from '@angular/core';
import {AddComponent} from '..';
import {ApiService} from '../../services/api.service';
import {By} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {of} from 'rxjs';
import {IMember} from '../../interfaces/member-interface';
import {MatTableDataSource} from '@angular/material/table';

describe('ListComponent', () => {
  let addComponent: AddComponent;
  let fixture: ComponentFixture<any>;
  let de;
  let component: ListComponent;
  let apiService: ApiService;


  beforeEach(async () => {
    @Component ({
      selector: 'app-add',
      template: ''
    })
    class TestClass {
      @Output() dataSourceChange = new EventEmitter<IMember[]>();

      onDataSourceChange = jasmine.createSpy();
      form = new FormGroup({
        lastName: new FormControl(),
        firstName: new FormControl(),
        patronymic: new FormControl(),
        phone: new FormControl()
      });
      public addItem(): void {
        apiService.addItem({
          rate: false,
          last_name: 'test',
          first_name: 'test',
          patronymic: 'test',
          phone: '+78888888888'
        }).subscribe((data) => {
          this.dataSourceChange.emit(data);
        });
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        TestClass
      ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            deleteItem: jasmine.createSpy().and.returnValue(of([])),
            rateItem: jasmine.createSpy().and.returnValue(of([])),
            addItem: jasmine.createSpy().and.returnValue(of([{
              rate: false,
              last_name: 'test',
              first_name: 'test',
              patronymic: 'test',
              phone: '+78888888888'
            }])),
          }
        }
      ]

    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    de = fixture.debugElement;
    addComponent = de.query(By.css('app-add')).componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be delete item', fakeAsync(() => {
    component.deleteItem(0);
    expect(apiService.deleteItem).toHaveBeenCalledWith(0);
    tick();
  }));

  it('should be rate item', fakeAsync(() => {
    component.rateItem(true, 0);
    expect(apiService.rateItem).toHaveBeenCalledWith(true, 0);
    tick();
  }));

  it('should be get item', fakeAsync(() => {
    const testItem = {
      lastName: 'test',
      firstName: 'test',
      patronymic: 'test',
      phone:  '+78888888888'
    };

    const response = {
      rate: false,
      last_name: testItem.lastName,
      first_name: testItem.firstName,
      patronymic: testItem.patronymic,
      phone: testItem.phone
    };

    addComponent.form.setValue(testItem);

    addComponent.addItem();

    apiService.addItem(response).subscribe(data => component.dataSource = new MatTableDataSource(data));
    tick();

    component.dataSource = new MatTableDataSource([response]);

    expect(component.dataSource.data).toEqual([response]);
  }));
});
