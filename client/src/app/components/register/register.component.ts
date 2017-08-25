import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  processing = false;
  messageClass;
  message;
  emailValid = false;
  emailMessage;
  usernameValid = false;
  usernameMessage;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group(
      {
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(30)
          ]
        ],
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            this.validateName
          ]
        ],
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            this.validateUsername
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(35),
            this.validatePassword
          ]
        ],
        confirm: ["", [Validators.required]]
      },
      { validator: this.matchingPasswords("password", "confirm") }
    );
  }

  validateUsername(controls) {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { validateUsername: true };
    }
  }

  validatePassword(controls) {
    const regex = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { validatePassword: true };
    }
  }

  validateName(controls) {
    const regex = new RegExp(/^[a-zA-Z\s]*$/);
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { validateName: true };
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { matchingPasswords: true };
      }
    };
  }
  disableForm() {
    this.registerForm.controls["email"].disable();
    this.registerForm.controls["username"].disable();
    this.registerForm.controls["password"].disable();
    this.registerForm.controls["name"].disable();
    this.registerForm.controls["confirm"].disable();
  }
  enableForm() {
    this.registerForm.controls["email"].enable();
    this.registerForm.controls["username"].enable();
    this.registerForm.controls["password"].enable();
    this.registerForm.controls["name"].enable();
    this.registerForm.controls["confirm"].enable();
  }

  get email() {
    return this.registerForm.get("email");
  }
  get username() {
    return this.registerForm.get("username");
  }
  get name() {
    return this.registerForm.get("name");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirm() {
    return this.registerForm.get("confirm");
  }

  checkEmail() {
    const email = this.registerForm.get("email").value;
    this.auth.checkEmail(email).subscribe(data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkUsername() {
    const username = this.registerForm.get("username").value;
    this.auth.checkUsername(username).subscribe(data => {
      if (!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.registerForm.get("email").value,
      username: this.registerForm.get("username").value,
      password: this.registerForm.get("password").value,
      name: this.registerForm.get("name").value
    };
    this.auth.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.enableForm();
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(()=>{
          this.router.navigate(['/profile']);
        },2000)
      }
    });
  }
}
