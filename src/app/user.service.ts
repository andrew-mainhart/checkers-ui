import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncSubject, BehaviorSubject} from 'rxjs';
import {User} from "./types/User";
import {e} from "@angular/core/src/render3";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = "https://rest.checkers451.com";
  //private baseUrl = "http://localhost:8080";

  private current_user: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  public setUser(myUser: User): AsyncSubject<User> {
    let ret = new AsyncSubject<User>();
    this.http.post(this.baseUrl + "/rest/set-user", myUser, {withCredentials: true}).subscribe(value => {
      ret.next(myUser);
      ret.complete();
      this.current_user.next(myUser);
    });
    return ret;
  }

  public getUser(): BehaviorSubject<User> {
    this.http.get<User>(this.baseUrl + "/rest/get-user", {withCredentials: true}).subscribe(value => {
      this.current_user.next(value);
    }, error => {
      this.current_user.next(null);
      console.error(error);
    });
    return this.current_user;
  }

  public getUserNoCache(): Promise<User> {

    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(this.baseUrl + "/rest/get-user", {withCredentials: true}).subscribe(value => {
        this.current_user.next(value);
        resolve(value);
      }, error => {
        reject(error);
        console.error(error);
      })
    });
  }


}
