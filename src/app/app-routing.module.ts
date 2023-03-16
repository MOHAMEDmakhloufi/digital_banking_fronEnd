import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {AuthGuard} from "./services/auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path:"login", component:LoginComponent},
  { path:"customers", component:CustomersComponent, canActivate: [AuthGuard]},
  { path:"accounts", component:AccountsComponent, canActivate: [AuthGuard]},
  { path:"new-customer", component:NewCustomerComponent, canActivate: [AuthGuard]},
  { path:"customer-accounts/:id", component: CustomerAccountsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
