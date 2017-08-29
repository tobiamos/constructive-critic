import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm : FormGroup;
  passwordForm : FormGroup;
  personalInfo = true;
  changePassword = false;
  removeAccount = false;
  constructor(private fb: FormBuilder) { 
    this.createSettingsForm();
    this.createPasswordForm();
  }

  ngOnInit() {
  }


  createSettingsForm () {
    this.settingsForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required]
    })
  }

  createPasswordForm () {
    this.passwordForm = this.fb.group({
      current : ['', Validators.required],
      new : ['', Validators.required],
      confirm : ['', Validators.required]
    })
  }

  showPersonalInfo(){
    this.personalInfo = true;
    this.changePassword = false;
    this.removeAccount = false;
  }

  showChangePassword(){
    this.personalInfo = false;
    this.changePassword = true;
    this.removeAccount = false;

  }

  showRemoveAccount(){
    this.personalInfo = false;
    this.changePassword = false;
    this.removeAccount = true;
  }
}
