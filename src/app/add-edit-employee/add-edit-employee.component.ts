// Import necessary Angular modules and Material components
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

// Component decorator with configuration
@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    // Import required modules
    RouterModule,
    MatInputModule,
    CommonModule,
    NgIf,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css',
  providers: [
    // Provider for customizing radio button color
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class AddEditEmployeeComponent implements OnInit {
  // Array for marital status options
  maritalStatuses: any[] = ['Single', 'Married', 'Divorced'];

  // Variables for employee details and action type
  employeeId: any;
  action = 'Create';

  // FormGroup for the reactive form
  myForm: FormGroup;

  // Constructor with dependency injection
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    // Initialize the form with form controls and validators
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    // Extract employee ID from the route parameters
    const idParam = 'id';
    this.employeeId = this.route.snapshot.params[idParam];
  }

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    // Check if employee ID is present to determine the action type
    if (this.employeeId !== undefined) {
      this.action = 'Edit';
      this.editEmployee();
    }
  }

  // Save employee details based on the action type (Create/Edit)
  saveEmployee(): void {
    // Create an Employee object with form values
    const employee: Employee = {
      fullName: this.myForm.get('fullName')?.value,
      email: this.myForm.get('email')?.value,
      hireDate: this.myForm.get('hireDate')?.value,
      phoneNumber: this.myForm.get('phoneNumber')?.value,
      maritalStatus: this.myForm.get('maritalStatus')?.value,
      gender: this.myForm.get('gender')?.value,
    };

    // Check the action type and call the appropriate method
    if (this.employeeId !== undefined) {
      this.updateEmployee(employee);
    } else {
      this.addEmployee(employee);
    }
  }

  // Add a new employee
  addEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee);
    this.snackBar.open('Employee registered successfully!', '', {
      duration: 3000,
    });
    this.router.navigate(['/']);
  }

  // Update an existing employee
  updateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee, this.employeeId);
    this.snackBar.open('Employee updated successfully!', '', {
      duration: 3000,
    });
    this.router.navigate(['/']);
  }

  // Load employee details for editing
  editEmployee(): void {
    const employee: Employee = this.employeeService.getEmployee(
      this.employeeId
    );
    this.myForm.patchValue({
      fullName: employee.fullName,
      email: employee.email,
      hireDate: employee.hireDate,
      phoneNumber: employee.phoneNumber,
      maritalStatus: employee.maritalStatus,
      gender: employee.gender,
    });
  }
}
