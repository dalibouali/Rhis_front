import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [
  { path: 'product', component: ProductsComponent },
  { path: 'user', component: UsersComponent },
  { path: 'role', component:RolesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
