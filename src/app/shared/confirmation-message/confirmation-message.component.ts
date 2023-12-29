import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-message',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-message.component.html',
  styleUrl: './confirmation-message.component.css',
})
export class ConfirmationMessageComponent implements OnInit {
  title: string;
  message: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
    this.title = data.title;
  }

  ngOnInit(): void {}
}
