import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';

// componenets
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// services
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { ToggleService } from './services/toggle.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ProfileService } from './services/profile.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BuferringHttpInterceptor } from './interceptors/http.interceptor';
import { DynamicComponentLoaderComponent } from './components/dynamic-component-loader/dynamic-component-loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, SpinnerComponent, DynamicComponentLoaderComponent],
  imports: [CommonModule, RouterModule,ToastModule],
  providers: [
    MessageService,
    AuthService,
    ThemeService,
    ToggleService,
    ProfileService,
    // interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BuferringHttpInterceptor,
      multi: true,
    },
  ],
  exports: [SidebarComponent, NavbarComponent, SpinnerComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
