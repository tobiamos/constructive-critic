import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  username;
  email;
  photo;
  count;
  info;
  infoClass;
  messages : String[];
  favorite = false;
  deleted = false;
  favmessages;
  
  

  constructor(private auth : AuthService, private router : Router) { 
      this.refreshTime;
  }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile=>{
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.photo = profile.user.photo;
      this.messages = profile.user.messages;
      this.count = profile.user.messages.length;
      this.favmessages = profile.user.messages.filter(function(x){
        return x.favourite === true;
      })

      

    })
  } 
  

  hideme = {};
  like = {};

  refresh(){
    window.location.reload();
  }
  reduce(){
    this.count+=-1;
  }

  deleteMessage(username,id){
    this.auth.deleteMessage(username,id).subscribe(data =>{
      if(!data.success){
        this.infoClass = 'alert alert-danger fade in';
        this.info = data.message;

      }else{
        // this.infoClass = "alert alert-success fade in";
        // this.info = data.message;
        this.deleted =true;
      }
    })
  }

  favouriteMessage(username, id){
    this.auth.favouriteMessage(username, id).subscribe(data=>{
      if(!data.success){
        this.infoClass = 'alert alert-danger';
        this.info = data.message;
      }else{
        this.infoClass = "alert alert-success";
        this.info = data.message;
      }
    })
  }

  setting(){
    this.router.navigate(['/settings']);
  }

  refreshTime = setInterval(()=>{

    this.auth.getProfile().subscribe(profile=>{
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.photo = profile.user.photo;
      this.messages = profile.user.messages;
      this.count = profile.user.messages.length;
      this.favmessages = profile.user.messages.filter(function(x){
        return x.favourite === true;
      })

      

    })

  },5000)

}
