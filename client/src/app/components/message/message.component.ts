import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

  photo;
  name;
  message;
  messageClass;
  userid;
  messageForm : FormGroup;
  sent = false;
  foundUser = true;
  leadMessage = "Leave a constructive message :)"
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private fb : FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    let username = this.route.snapshot.params['username'];
    this.auth.getMessage(username).subscribe(profile =>{
      if(profile.success){
        this.photo = profile.user.photo;
        this.name = profile.user.name;
        this.userid = profile.user._id;
        this.foundUser = true;
        this.sent = false;
      }else{
          this.message = "No details found";
          this.foundUser = false;
          this.leadMessage = "";
      }
    });
    
  }

  
  onSubmit(){
    this.sent = true;
    this.leadMessage = "Thanks for your opinion";
    const message = {
      message : this.messageForm.get('message').value,
      date : Date.now()
    };
    this.auth.sendMessage(this.userid, message).subscribe(data=>{
      if(!data.success){
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    })
    // setTimeout(()=>{
    //   this.router.navigate(['/']);
    // },1000)
    
  }


  createForm(){
    this.messageForm = this.fb.group({
      message : ['', Validators.required]
    })
  }

  get mess () {
    return this.messageForm.get("message");
  }
}
