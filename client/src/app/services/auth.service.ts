import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  registerRoute = "http://localhost:3000/api/register";
  apiRoute = "https://fast-escarpment-91326.herokuapp.com/api";

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
    return this._http.post(`${this.apiRoute}/register`, user).map(res => res.json());
  }

  checkUsername(username) {
    return this._http
      .get(`${this.apiRoute}/checkusername/${username}`)
      .map(res => res.json());
  }

  checkEmail(email) {
    return this._http
      .get(`${this.apiRoute}/checkemail/${email}`)
      .map(res => res.json());
  }

  login(user) {
    return this._http
      .post(`${this.apiRoute}/login`, user)
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
      .get(`${this.apiRoute}/profile`, this.options)
      .map(res => res.json());
  }

  getMessage(username) {
    return this._http
      .get(`${this.apiRoute}/message/${username}`)
      .map(res => res.json());
  }
  sendMessage(userid, message) {
    return this._http
      .post(`${this.apiRoute}/message/${userid}`, message)
      .map(res => res.json());
  }

  deleteMessage(username, messageId) {
    return this._http
      .delete(
        `${this.apiRoute}/message/${username}?messageId=${messageId}`
      )
      .map(res => res.json());
  }
  favouriteMessage(username, messageId) {
    return this._http
      .delete(
        `${this.apiRoute}/favourite/${username}?messageId=${messageId}`
      )
      .map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired();
  }

  changePersonalInfo(userdetails) {
    this.createAuthenticationHeaders();
    return this._http
      .post(`${this.apiRoute}/changepersonalinfo`, userdetails)
      .map(res => res.json());
  }
  changePassword(userdetails) {
    this.createAuthenticationHeaders();
    return this._http
      .post(`${this.apiRoute}/changepassword`, userdetails)
      .map(res => res.json());
  }
  removeUser(username) {
    return this._http
      .delete(`${this.apiRoute}/removeuser/${username}`)
      .map(res => res.json());
  }

  forgotPassword(email) {
    return this._http
      .post(`${this.apiRoute}/forgotpassword`, email)
      .map(res => res.json());
  }
}
