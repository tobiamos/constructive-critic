import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  processing = false;
  messageClass;
  message;
  previousUrl;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private authguard: AuthGuard
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authguard.redirectUrl) {
      this.messageClass = "alert alert-danger";
      this.message = "You must be logged in to view that page";
      this.previousUrl = this.authguard.redirectUrl;
      this.authguard.redirectUrl = undefined;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  disableForm() {
    this.loginForm.controls["email"].disable();
    this.loginForm.controls["password"].disable();
  }

  enableForm() {
    this.loginForm.controls["email"].enable();
    this.loginForm.controls["password"].enable();
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value
    };
    this.auth.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        this.auth.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(["/profile"]);
          }
        }, 2000);
      }
    });
  }
}
