import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsNotificationsComponent } from './settings-notifications/settings-notifications.component';
import { SettingsInfoComponent } from './settings-info/settings-info.component';
import { SettingsSecurityComponent } from './settings-security/settings-security.component';
import { SettingsPicturesComponent } from './settings-pictures/settings-pictures.component';
import { SettingsSocialmediaComponent } from './settings-socialmedia/settings-socialmedia.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [CommonModule, SharedModule, SettingsRoutingModule, ToastModule,],
  declarations: [
    SettingsPageComponent,

    SettingsInfoComponent,
    SettingsPicturesComponent,
    SettingsSecurityComponent,
    SettingsNotificationsComponent,
    SettingsSocialmediaComponent,

  ],
})
export class SettingsModule {}
