import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountComponent } from "./components/account/account.component";
import { UserRoutingModule } from "./user-routing.module";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { FormsModule } from "@angular/forms";
import { ClarityModule } from "@clr/angular";

@NgModule({
  declarations: [AccountComponent, LoginPageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ClarityModule
  ]
})
export class UserModule {}
