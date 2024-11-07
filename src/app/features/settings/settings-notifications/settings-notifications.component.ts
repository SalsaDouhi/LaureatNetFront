import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../../core/services/userSettings.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserSettings } from '../../../shared/interfaces/UserSettings';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-settings-notifications',
  templateUrl: './settings-notifications.component.html',
  styleUrl: './settings-notifications.component.css',
})
export class SettingsNotificationsComponent implements OnInit {
  settings: UserSettings = {} as UserSettings;
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      privateMsgs: new FormControl(),
      administrativePosts: new FormControl(),
      connectionRequest: new FormControl(),
    });

    this.userSettingsService.getUserSettings().subscribe({
      next: (data) => {
        this.settings = data;
        this.form.setValue({
          privateMsgs: data.privateMsgs,
          administrativePosts: data.administrativePosts,
          connectionRequest: data.connectionRequest,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  save() {
    let newSettings = {
      ...this.settings,
      privateMsgs: this.form.get('privateMsgs')?.value,
      administrativePosts: this.form.get('administrativePosts')?.value,
      connectionRequest: this.form.get('connectionRequest')?.value,
    } as UserSettings;

    let currentUserId = this.authService.getCurrentUserId();
    console.log(currentUserId);
    this.userSettingsService
      .updateUserSettings(currentUserId, newSettings)
      .subscribe({
        next: (data) => {
          // TODO show confirm toast
          // console.log(data);
        },
        error: (error) => {
          // TODO show error toast
          console.log(error);
        },
      });
  }
}
