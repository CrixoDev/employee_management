// Import necessary Angular and Material modules
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Import Employee and EmployeeService
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  standalone: true,
  // Import Material modules used in the component
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class ListEmployeeComponent implements AfterViewInit {
  // Define displayed columns for the MatTable
  displayedColumns: string[] = ['position','fullName', 'phoneNumber', 'email', 'hireDate', 'maritalStatus', 'gender'];
  
  // Create a MatTableDataSource for the employee data
  dataSource: MatTableDataSource<Employee>;
  
  // Array to store the list of employees
  employeeList: Employee[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService: EmployeeService) {
    // Retrieve the list of employees from the service
    this.employeeList = this.employeeService.getEmployees();
    
    // Initialize the MatTableDataSource with the employee list
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  // ViewChild decorators to get references to MatPaginator and MatSort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    // Connect the MatSort and MatPaginator to the MatTableDataSource
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Method to announce changes in sorting
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Method to apply a filter to the MatTableDataSource
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
