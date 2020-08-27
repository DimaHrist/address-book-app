import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be add item', fakeAsync(() => {
    expect(service.dataSource).toEqual([]);

    const testItem = {
      rate: false,
      last_name: 'test',
      first_name: 'test',
      patronymic: 'test',
      phone: '+70000000000'
    };
    const spy = jasmine.createSpy();

    service.addItem(testItem).subscribe(spy);
    tick();

    expect(service.dataSource).toEqual([testItem]);
    expect(spy).toHaveBeenCalledWith([testItem]);
  }));

  it('should be add item', fakeAsync(() => {
    const testItem = {
      rate: false,
      last_name: 'test',
      first_name: 'test',
      patronymic: 'test',
      phone: '+70000000000'
    };
    const spy = jasmine.createSpy();

    service.dataSource = [testItem];
    service.deleteItem(0).subscribe(spy);
    tick();

    expect(service.dataSource).toEqual([]);
    expect(spy).toHaveBeenCalledWith([]);

  }));

  it('should be add item', fakeAsync(() => {
    const testItem = [
      {
      rate: false,
      last_name: 'test1',
      first_name: 'test1',
      patronymic: 'test1',
      phone: '+70000000000'
    },
    {
      rate: false,
      last_name: 'test2',
      first_name: 'test2',
      patronymic: 'test2',
      phone: '+70000000000'
    },
    {
      rate: false,
      last_name: 'test3',
      first_name: 'test3',
      patronymic: 'test3',
      phone: '+70000000000'
    }
    ];
    const spy = jasmine.createSpy();

    service.dataSource = testItem;
    service.rateItem(true, 1).subscribe(spy);
    tick();

    expect(service.dataSource[0].rate).toBeTruthy();
    expect(service.dataSource.length).toEqual(3);

    service.rateItem(false, 0).subscribe(spy);
    tick();

    expect(service.dataSource[2].rate).toBeFalsy();
    expect(service.dataSource.length).toEqual(3);
  }));
});
