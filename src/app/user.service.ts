import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncSubject, BehaviorSubject} from 'rxjs';
import {User} from "./types/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://rest.checkers451.com";
  //private baseUrl = "http://localhost:8080";

  private current_user: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  public setUser(myUser: User): AsyncSubject<User>{

    let user: User = {"name" : "Brian"};
    let ret = new AsyncSubject<User>();

    this.http.post(this.baseUrl + "/rest/set-user", user, {withCredentials : true}).subscribe(value => {
      ret.next(user);
      ret.complete();
      this.current_user.next(user);
    });

    return ret;
  }

  public getUser(): BehaviorSubject<User> {

    this.http.get<User>(this.baseUrl + "/rest/get-user", {withCredentials: true}).subscribe(value => {
        this.current_user.next(value);
    });
    return this.current_user;
  }

}
