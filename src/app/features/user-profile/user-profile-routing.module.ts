import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: '', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'update', component: UpdateProfileComponent, canActivate: [AuthGuard] },

  { path: ':id', component: ProfilePageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
