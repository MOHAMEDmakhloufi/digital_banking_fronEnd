import { Injectable } from '@angular/core';
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Tokens} from "../model/Tokens";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean= false;
  public userAuthenticated : User ;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<Tokens>{
    return this.http.post<Tokens>(environment.backendHost + `/login?username=${username}&password=${password}`, null);
  }

  public isAdmin(){
    if (this.userAuthenticated){
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1)
        return true;
    }
    return false;
  }
  public saveAuthenticatedUser(tokens: Tokens){
    localStorage.setItem('access_token', tokens.access_token)
  }
  public getAccessToken(){
    return localStorage.getItem('access_token');
  }
  public loadAuthenticatedUserFromLocalStorage(){

  }
}
