import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  registerRoute = "http://localhost:3000/api/register";
  authToken;
  user;
  options;

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem("token");
  }

  constructor(private _http: Http) {}

  registerUser(user) {
    return this._http.post(this.registerRoute, user).map(res => res.json());
  }

  checkUsername(username) {
    return this._http
      .get(`http://localhost:3000/api/checkusername/${username}`)
      .map(res => res.json());
  }

  checkEmail(email) {
    return this._http
      .get(`http://localhost:3000/api/checkemail/${email}`)
      .map(res => res.json());
  }

  login(user) {
    return this._http
      .post(`http://localhost:3000/api/login`, user)
      .map(res => res.json());
  }
  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this._http
      .get(`http://localhost:3000/api/profile`, this.options)
      .map(res => res.json());
  }

  getMessage(username){
    return this._http.get(`http://localhost:3000/api/message/${username}`)
    .map(res => res.json());
  }
  sendMessage(userid,message){
    return this._http.post(`http://localhost:3000/api/message/${userid}`,message)
    .map(res=> res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired();
  }
}
