import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  registerRoute = "http://localhost:3000/api/register";
  checkEmailRoute = "http://localhost:3000/api/checkemail/";
  checkUsernameRoute = "http://localhost:3000/api/checkusername/";
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
    return this._http.get(`http://localhost:3000/api/checkemail/${email}`).map(res => res.json());
  }
}
