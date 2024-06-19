// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-customer-details-edit',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './customer-details-edit.component.html',
  styleUrls: ['./customer-details-edit.component.scss']
})
export class CustomerDetailsEditComponent {
  // constructor
  constructor(public dialogRef: MatDialogRef<CustomerDetailsEditComponent>) {}
}
