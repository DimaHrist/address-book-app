import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './components';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Анализ рынка'
    }
  },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AddressBookRoutingModule {}
