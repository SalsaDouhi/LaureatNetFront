import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/usersData.service';
import { UserAccountMV } from '../../../shared/interfaces/UserAccountMV';
import { Router } from '@angular/router';
import { AccountType } from '../../../shared/interfaces/AccountType';
import { AccountTypeService } from '../../../core/services/accountType.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  userForm!: FormGroup;
  accountTypes: AccountType[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private accountTypeService: AccountTypeService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.accountTypeService.getAllAccountTypes().subscribe({
      next: (accountTypes) => {
        this.accountTypes = accountTypes;
      },
    });
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: [true, Validators.required],
      roleId: ['', Validators.required],
      major: ['', Validators.required],
      currentGrade: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserAccountMV = {
        email: this.userForm.value.email,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        birthDate: this.userForm.value.birthDate,
        gender: this.userForm.value.gender === 'true' ? true : false,
        roleId: this.userForm.value.roleId,
        major: this.userForm.value.major,
        currentGrade: this.userForm.value.currentGrade,
      } as UserAccountMV;
      // console.log(userData);
      this.userService.createUserAccounts([userData]).subscribe(
        (response) => {
          // console.log('Utilisateur créé avec succès !', response);
          // Réinitialiser le formulaire ou naviguer vers une autre page
          this.userForm.reset();
        
          this.router.navigate(['/admin/users']);  this.messageService.add({severity:'success', summary: 'Succès', detail: 'ajouter avec succes ce utilisateur !'});
        },
        (error) => {
          console.error("Erreur lors de la création de l'utilisateur :", error);
          this.router.navigate(['/admin/users']);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
