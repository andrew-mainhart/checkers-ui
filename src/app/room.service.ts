import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Room} from "./types/Room";

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) {
  }

  private currentRoom = new BehaviorSubject<Room>(null);

  private baseUrl = "https://rest.checkers451.com";
  //private baseUrl = "http://localhost:8080";

  public newRoom(): BehaviorSubject<Room> {
    let ret = this.currentRoom;
    ret.next(null);
    this.http.post<Room>(this.baseUrl + "/rest/new-room", null, {withCredentials : true}).subscribe((value => {
      ret.next(value);
    }), (error => {
      console.error(error);
    }));
    return ret;
  }
}
