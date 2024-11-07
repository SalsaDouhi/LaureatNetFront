import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent implements OnInit {
  title: string = 'Confirm your action';
  message: string = 'Are you sure?';
  type: string = 'dangger';

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data == null) return;
    this.title = this.data.title;
    this.message = this.data.message;
    this.type = this.data.type;
  }

  onConfirm(): void {
    this.dialogRef.close({ confirmed: true });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
