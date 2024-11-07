import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'profiles',
    loadChildren: () =>
      import('./features/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'technology',
    loadChildren: () =>
      import('./features/technology/technology-data.module').then(
        (m) => m.TechnologyDataModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'entreprise',
    loadChildren: () =>
      import('./features/Entreprise/entreprise.module').then(
        (m) => m.EntrepriseModule
      ),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./features/post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'connection',
    loadChildren: () =>
      import('./features/connection/connection.module').then(
        (m) => m.ConnectionModule
      ),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./features/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'block',
    loadChildren: () =>
      import('./features/block/block.module').then((m) => m.BlockModule),
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./features/subscription/subscription.module').then(
        (m) => m.SubscriptionModule
      ),
  },

  {
    path: 'report',
    loadChildren: () =>
      import('./features/report/report.module').then((m) => m.ReportModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
