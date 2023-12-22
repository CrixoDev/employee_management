import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
})
export class ListEmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'email', 'hireDate', 'maritalStatus', 'gender'];
  dataSource :  MatTableDataSource<Employee>;
  employeeList: Employee[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService: EmployeeService) {
    this.employeeList = this.employeeService.getEmployees();
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
