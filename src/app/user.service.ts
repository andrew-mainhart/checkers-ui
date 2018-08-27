import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncSubject} from "rxjs";
import {User} from "./types/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://rest.checkers451.com";
  //private baseUrl = "http://localhost:8080";

  public setUser(): AsyncSubject<User>{

    let user: User = {"name" : "Brian"};
    let ret = new AsyncSubject<User>();

    this.http.post(this.baseUrl + "/rest/set-user", user, {withCredentials : true}).subscribe(value => {
      ret.next(user);
      ret.complete();
    });

    return ret;
  }
}
