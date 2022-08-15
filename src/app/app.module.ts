import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

import { UserService } from '../app/users/user.service';
import { FormsModule } from '@angular/forms';
import { RolesComponent } from './roles/roles.component';

import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakSecurityService } from './keycloak-security.service';


export function kcFactory(kcSecurity: KeycloakSecurityService) {
  return () => kcSecurity.init();

}




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsersComponent,

    NavbarComponent,
    UsersComponent,
    RolesComponent,
    HomeComponent,





  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule,



  ],
  providers: [UserService, { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: APP_INITIALIZER, deps: [KeycloakSecurityService], useFactory: kcFactory, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
