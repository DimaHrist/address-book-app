import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AddComponent } from './add.component';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';
import {of} from 'rxjs';

describe('AddComponent', () => {
  let host: any;
  let fixture: ComponentFixture<any>;
  let de;
  let component: AddComponent;
  let apiService: ApiService;

  beforeEach(() => {
    @Component ({
      template: '<app-add (dataSourceChange)="onDataSourceChange($event)"></app-add>'
    })
    class TestClass {
      onDataSourceChange = jasmine.createSpy();
    }

    TestBed.configureTestingModule({
      declarations: [
        AddComponent,
        TestClass
      ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            addItem: jasmine.createSpy().and.returnValue(of({}))
          }
        }
      ]

    });
    fixture = TestBed.createComponent(TestClass);
    host = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    de = fixture.debugElement;
    component = de.query(By.css('app-add')).componentInstance;
    fixture.detectChanges();
  });

  it('should be create item', fakeAsync(() => {
    const testItem = {
      lastName: 'test',
      firstName: 'test',
      patronymic: 'test',
      phone:  '+78888888888'
    };

    component.form.setValue(testItem);

    component.addItem();

    expect(apiService.addItem).toHaveBeenCalledWith({
      rate: false,
      last_name: testItem.lastName,
      first_name: testItem.firstName,
      patronymic: testItem.patronymic,
      phone: testItem.phone
    });
    tick();

    expect(host.onDataSourceChange).toHaveBeenCalled();
    expect(component.form.value).toEqual({
      lastName: null,
      firstName: null,
      patronymic: null,
      phone: null
    });
  }));
});
