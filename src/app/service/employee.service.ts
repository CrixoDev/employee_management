import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}
  employeeList: Employee[] = [
    {
      fullName: 'Juan Perez',
      email: 'jp@gmail.com',
      phoneNumber: 546562313,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Rocio Garcia',
      email: 'rg@gmail.com',
      phoneNumber: 5464981232,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Ruben Gonzalez',
      email: 'ruben.gonzalez@gmail.com',
      phoneNumber: 542985421564,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Andrea Shucth',
      email: 'andrea.shucth@gmail.com',
      phoneNumber: 35158674445,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Till Hans',
      email: 'till.hans@gmail.com',
      phoneNumber: 35156474789,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Eva Braum',
      email: 'eva.braum@gmail.com',
      phoneNumber: 265056465,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'John Smith',
      email: 'john.smith@gmail.com',
      phoneNumber: 1132321,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Marie Curie',
      email: 'marie.curie@gmail.com',
      phoneNumber: 15681650,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'James Bond',
      email: 'james.bond@gmail.com',
      phoneNumber: 725212786,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Marina Joyce',
      email: 'marina.joyce@gmail.com',
      phoneNumber: 14567867,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Jeff Bezos',
      email: 'jeff.bezos@gmail.com',
      phoneNumber: 54675368562313,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Melinda Gates',
      email: 'melinda.gates@gmail.com',
      phoneNumber: 54656876772313,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Warren Buffet',
      email: 'warren.buffet@gmail.com',
      phoneNumber: 452372,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Noelia Paz',
      email: 'noelia.paz@gmail.com',
      phoneNumber: 75423753,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Ricardo Ford',
      email: 'ricardo.ford@gmail.com',
      phoneNumber: 4045637407,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Emma Watson',
      email: 'emma.watson@gmail.com',
      phoneNumber: 87654321,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Tom Hanks',
      email: 'tom.hanks@gmail.com',
      phoneNumber: 98765432,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Jennifer Lopez',
      email: 'jennifer.lopez@gmail.com',
      phoneNumber: 12345678,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Brad Pitt',
      email: 'brad.pitt@gmail.com',
      phoneNumber: 23456789,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Emma Stone',
      email: 'emma.stone@gmail.com',
      phoneNumber: 34567890,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Leonardo DiCaprio',
      email: 'leonardo.dicaprio@gmail.com',
      phoneNumber: 45678901,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Taylor Swift',
      email: 'taylor.swift@gmail.com',
      phoneNumber: 56789012,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Chris Evans',
      email: 'chris.evans@gmail.com',
      phoneNumber: 67890123,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
    {
      fullName: 'Adele',
      email: 'adele@gmail.com',
      phoneNumber: 78901234,
      gender: 'Female',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Single',
    },
    {
      fullName: 'Keanu Reeves',
      email: 'keanu.reeves@gmail.com',
      phoneNumber: 89012345,
      gender: 'Male',
      hireDate: this.getRandomDate(),
      maritalStatus: 'Married',
    },
  ];

  private getRandomDate(): Date {
    const startDate = new Date(2000, 0, 1); // Start date: January 1, 2000
    const endDate = new Date(); // Current date

    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    return randomDate;
  }
  getEmployees(): Employee[] {
    return this.employeeList.slice();
  }

  deleteEmployee(index: number): void {
    this.employeeList.splice(index, 1);
  }

  addEmployee(employee: Employee): void {
    this.employeeList.unshift(employee);
  }

  getEmployee(index: number): Employee {
    return this.employeeList[index];
  }

  updateEmployee(editedEmployee: Employee, employeeId: number): void {
    this.employeeList[employeeId].fullName = editedEmployee.fullName;
    this.employeeList[employeeId].email = editedEmployee.email;
    this.employeeList[employeeId].hireDate = editedEmployee.hireDate;
    this.employeeList[employeeId].phoneNumber = editedEmployee.phoneNumber;
    this.employeeList[employeeId].gender = editedEmployee.gender;
    this.employeeList[employeeId].maritalStatus = editedEmployee.maritalStatus;
  }
}
