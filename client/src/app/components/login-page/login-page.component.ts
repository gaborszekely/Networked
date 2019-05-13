import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { ILoginResponse } from "src/app/interfaces/LoginResponse";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  form = {
    username: "",
    password: ""
  };
  submitted = false;

  constructor(private readonly loginService: LoginService) {}

  ngOnInit() {}

  async onSubmit() {
    // setTimeout(() => {
    //   this.submitted = true;
    // }, 300);
    try {
      const { username, password } = this.form;
      const res: ILoginResponse = await this.loginService.loginUser(
        username,
        password
      );
      if (res.status === 200) {
        this.loginService.setJsonToken(res);
        // set loggedIn = true in state management or something similar
      } else {
      }
    } catch (err) {}
  }
}
