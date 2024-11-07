import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrl: './settings-security.component.css',
})
export class SettingsSecurityComponent implements OnInit {
  passwordForm!: FormGroup;
  currentUserId: number = 0;
  confirmPasswordInvalid: boolean = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });

    this.currentUserId = this.authService.getCurrentUserId();
  }

  submit() {
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.value.newPassword !==
        this.passwordForm.value.confirmNewPassword
      ) {
        this.confirmPasswordInvalid = true;
        return;
      }

      this.profileService
        .updateUserPassword(this.currentUserId, this.passwordForm.value)
        .subscribe(
          (response) => {
            this.passwordForm.patchValue({
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            });
             this.messageService.add({severity:'success', summary: 'Succès', detail: 'modification avec succes!'});
            // TODO show confirm toast
          },
          (error) => {
            // TODO show error toast
            console.log(error);
            // this.showErrorModal = true;
            // alert(error);
          }
        );
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
