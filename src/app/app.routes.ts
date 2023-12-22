import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

export const routes: Routes = [
    {path: 'navbar', component: NavbarComponent},
    { path: '**', component: ListEmployeeComponent }
];
