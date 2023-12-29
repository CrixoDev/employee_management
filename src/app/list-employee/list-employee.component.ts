// Import necessary Angular and Material modules
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Import Employee and EmployeeService
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';

// Import Confirmation Message
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  standalone: true,
  // Import Material modules used in the component
  imports: [
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ListEmployeeComponent implements OnInit {
  // Define displayed columns for the MatTable
  displayedColumns: string[] = [
    'fullName',
    'phoneNumber',
    'email',
    'maritalStatus',
    'gender',
    'hireDate',
    'actions',
  ];
  // Create a MatTableDataSource for the employee data
  dataSource: MatTableDataSource<Employee>;

  // Array to store the list of employees
  employeeList: Employee[] = [];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Retrieve the list of employees from the service
    this.employeeList = this.employeeService.getEmployees();

    // Initialize the MatTableDataSource with the employee list
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  // ViewChild decorators to get references to MatPaginator and MatSort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
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
  // Load employees and set up data source, paginator, and sorting
  loadEmployees(): void {
    // Retrieve the list of employees from the service
    this.employeeList = this.employeeService.getEmployees();

    // Create a new MatTableDataSource with the retrieved employee list
    this.dataSource = new MatTableDataSource(this.employeeList);

    // Set up paginator and sorting
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Customize paginator labels
    this.dataSource.paginator._intl.nextPageLabel = 'Next';
    this.dataSource.paginator._intl.lastPageLabel = 'Last page';
  }

  // Delete an employee by displaying a confirmation dialog
  deleteEmployee(index: number): void {
    // Open a confirmation dialog
    const confirmDialog = this.dialog.open(ConfirmationMessageComponent, {
      data: {
        title: 'Employee Deletion Confirmation',
        message: 'Are you sure you want to delete the employee?',
      },
    });

    // Subscribe to the result of the confirmation dialog
    confirmDialog.afterClosed().subscribe((result) => {
      // Check if the user confirmed the deletion
      if (result === true) {
        // Delete the employee using the service
        this.employeeService.deleteEmployee(index);

        // Reload the list of employees
        this.loadEmployees();

        // Display a snack bar message indicating the successful deletion
        this.snackBar.open('The employee was successfully deleted!', '', {
          duration: 3000,
        });
      }
    });
  }
}
