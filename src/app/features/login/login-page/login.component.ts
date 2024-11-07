import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errorMessage = '';
      this.authService
        .login(this.form.get('email')?.value, this.form.get('password')?.value)
        .subscribe({
          next: (response) => {
            this.authService.setToken(response.token);
            this.authService.decodeUserToken();
            this.profileService.fetchCurrentUserDetails();
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.errorMessage = 'Email ou mot de passe incorrect!';
            console.log(error);
          },
        });
    } else {
      console.log('Form is not valid');
    }
  }

  toggleShowPassword(event: MouseEvent): void {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }
}
