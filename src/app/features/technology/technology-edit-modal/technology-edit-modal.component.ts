import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-technology-edit-modal',
  templateUrl: './technology-edit-modal.component.html',
  styleUrl: './technology-edit-modal.component.css',
})
export class TechnologyEditModalComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TechnologyEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data == null) return this.dialogRef.close();

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.form.setValue({
      title: this.data.title,
    });
  }

  onDelete(): void {
    this.dialogRef.close({
      delete: true,
    });
  }

  onSubmit(): void {
    let title = this.form.get('title')?.value.toString().trim();
    if (title == '') return;

    this.dialogRef.close({
      title: title,
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
