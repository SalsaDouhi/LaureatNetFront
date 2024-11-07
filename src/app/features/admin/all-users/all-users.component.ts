import { Component, OnInit } from '@angular/core';
import { UserAccountMV } from '../../../shared/interfaces/UserAccountMV';
import { UserService } from '../../../core/services/usersData.service';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: UserAccountMV[] = [];
  filteredUsers: UserAccountMV[] = [];

  constructor(private userService: UserService,private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
      console.log(users);
    });
  }
  createNewUser(): void {
    this.router.navigate(['/admin/create-user']);
  }

  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        message: `Êtes-vous sûr de vouloir supprimer cet utilisateur ?`,
        type: 'danger',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result.confirmed !== true) return;

      this.userService.deleteUser(userId).subscribe(() => {
        // Supprimer l'utilisateur confirmé
        this.users = this.users.filter(user => user.id !== userId);
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== userId);
      });
    });
  }





  filterUsers(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.lastName?.toLowerCase().includes(searchTerm) ||
      user.firstName?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm)
    );
  }
}
