import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "./components/account/account.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";

const routes: Routes = [
  { path: "account", component: AccountComponent },
  { path: "login", component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
