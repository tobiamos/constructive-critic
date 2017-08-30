import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  passwordForm: FormGroup;
  personalInfo = true;
  changePassword = false;
  removeAccount = false;
  settingFormProcessing = false;
  passwordFormProcessing = false;
  emailValid = false;
  emailMessage;
  message;
  messageClass;
  formName;
  formEmail;
  settingsValid = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createSettingsForm();
    this.createPasswordForm();
  }

  ngOnInit() {
    this.auth.getProfile().subscribe(data => {
      this.formName = data.user.name;
      this.formEmail = data.user.email;
    });
  }

  createSettingsForm() {
    this.settingsForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          this.validateName
        ]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30)
        ]
      ]
    });
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        current: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(35),
            this.validatePassword
          ]
        ],
        newpass: [
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
      { validator: this.matchingPasswords("newpass", "confirm") }
    );
  }

  showPersonalInfo() {
    this.personalInfo = true;
    this.changePassword = false;
    this.removeAccount = false;
  }

  showChangePassword() {
    this.personalInfo = false;
    this.changePassword = true;
    this.removeAccount = false;
  }

  showRemoveAccount() {
    this.personalInfo = false;
    this.changePassword = false;
    this.removeAccount = true;
  }
  validateName(controls) {
    const regex = new RegExp(/^[a-zA-Z\s]*$/);
    if (regex.test(controls.value)) {
      return null;
    } else {
      return { validateName: true };
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
  matchingPasswords(newpass, confirm) {
    return (group: FormGroup) => {
      if (group.controls[newpass].value === group.controls[confirm].value) {
        return null;
      } else {
        return { matchingPasswords: true };
      }
    };
  }

  checkDefaultName(name, defaultName) {
    return (group: FormGroup) => {
      if (group.controls[name].value === defaultName) {
        return null;
      } else {
        return { checkDefaultName: true };
      }
    };
  }

  get name() {
    return this.settingsForm.get("name");
  }

  get email() {
    return this.settingsForm.get("email");
  }

  get current() {
    return this.passwordForm.get("current");
  }

  get newpass() {
    return this.passwordForm.get("newpass");
  }

  get confirm() {
    return this.passwordForm.get("confirm");
  }
  checkEmail() {
    const email = this.settingsForm.get("email").value;
    this.auth.checkEmail(email).subscribe(data => {
      if (
        !data.success &&
        this.settingsForm.get("email").value === this.formEmail
      ) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  onSettingsFormSubmit() {
    const userdetails = {
      name : this.settingsForm.get('name').value,
      email : this.settingsForm.get('email').value,
      formEmail: this.formEmail
    }
    this.auth.changePersonalInfo(userdetails).subscribe(data=>{
      if(!data.success){
        this.messageClass = "alert alert-danger";
        this.message = data.message;

      }else {
        this.messageClass = "alert aelrt-success";
        this.message = data.message;
      }
    })
  }

  onPasswordFormSubmit() {}
}
