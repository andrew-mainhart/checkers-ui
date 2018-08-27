import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Room} from "./types/Room";
import {User} from './types/User';
import {stringify} from 'querystring';

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

  public joinRoom(user: User, code: string): BehaviorSubject<Room> {
    let ret = this.currentRoom;
    ret.next(null);
    this.http.post<Room>(this.baseUrl + "/rest/join-room", null, {withCredentials: true, params: {"code": code, "as": "PLAYER"}}).subscribe((value => {
      ret.next(value);
    }), (error => {
      console.error(error);
    }));
    return ret;
  }

  public updateRoom (room: Room): BehaviorSubject<Room> {

    this.http.get<Room>(this.baseUrl + '/rest/update-room', {withCredentials: true, params: {"code": room.code, "version": ('' + room.version)}}).subscribe((value => {
      this.currentRoom.next(value);
      this.updateRoom(this.currentRoom.getValue());
    }));
    return this.currentRoom;

  }

  public getCurrentRoom(): BehaviorSubject<Room> {
    return this.currentRoom;
  }


}
