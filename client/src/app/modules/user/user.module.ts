import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountComponent } from "./components/account/account.component";
import { UserRoutingModule } from "./user-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, UserRoutingModule, RouterModule]
})
export class UserModule {}
