// ? Angular Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// ? Components

// ? Services
import { AuthService } from './core/services/auth.service';

// ? Style stuff
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './features/test-page/test-page.component';
import { CoreModule } from './core/core.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { ConfirmationDialogService } from './core/services/confirmation-dialog.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    // * components here
    AppComponent,
    TestPageComponent,
  ],
  imports: [
    ToastModule,
    CommonModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken');
        },
        allowedDomains: ['http://localhost:8080/'],
        disallowedRoutes: ['http://example.com/api/auth'],
      },
    }),
  ],
  providers: [AuthService, ConfirmationDialogService,MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
