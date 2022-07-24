import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [
  { path: 'product', component: ProductsComponent },
  { path: 'user', component: UsersComponent },
  { path: 'role', component:RolesComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
