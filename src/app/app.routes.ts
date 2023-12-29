import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';

export const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'add', component: AddEditEmployeeComponent },
  { path: 'edit/:id', component: AddEditEmployeeComponent },
  { path: '**', component: ListEmployeeComponent },
];
