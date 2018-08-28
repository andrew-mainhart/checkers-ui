import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Room} from "./types/Room";
import {User} from './types/User';
import {stringify} from 'querystring';
import {Move} from './types/Move';

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
      this.updateRoom(value);
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
      this.updateRoom(value);
    }), (error => {
      console.error(error);
    }));
    return ret;
  }

  public updateRoom (room: Room): BehaviorSubject<Room> {

    this.http.get<Room>(this.baseUrl + '/rest/update-room', {withCredentials: true, params: {"code": room.code, "version": ('' + room.version)}}).subscribe((value => {
      if(value.code == this.currentRoom.getValue().code) {
        this.currentRoom.next(value);
        this.updateRoom(this.currentRoom.getValue());
      } else {
        alert("Has the current room switched?");
      }
    }));
    return this.currentRoom;

  }

  public getCurrentRoom(): BehaviorSubject<Room> {
    return this.currentRoom;
  }

  public startGame(room: Room){
    this.http.post(this.baseUrl + "/rest/new-game", null, {withCredentials: true, params : {"code" : room.code}}).subscribe(value => {
      console.log(value);
    });
  }

  public makeMove(move: Move, code: string) {
    this.http.post(this.baseUrl + "/rest/game-move", null, {withCredentials: true, params : {"code" : code}}).subscribe(value=>{
      console.log("done");
    });
  }


}
