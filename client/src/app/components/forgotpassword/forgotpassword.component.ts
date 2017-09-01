import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  resetpasswordForm: FormGroup;
  formSent= false;
  messageClass;
  message;
  constructor(private fb : FormBuilder, private auth : AuthService ) {
    this.createForm();
   }

  ngOnInit() {
  }


  createForm(){
    this.resetpasswordForm = this.fb.group({
      email : ['',[Validators.required, Validators.email]]
    })
  }

  onForgotPasswordSubmit(){
    this.formSent = true;
    const user = {
      email : this.resetpasswordForm.get('email').value
    }
    this.auth.forgotPassword(user).subscribe(data=>{
      if(!data.success){
        this.formSent = false;
        this.messageClass = "alert alert-danger";
        this.message = data.message;

      }else{
        this.formSent = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    })
  }
}
