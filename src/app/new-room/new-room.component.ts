import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {Room} from "../types/Room";
import {UserService} from "../user.service";

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  constructor(private roomService: RoomService,
              private userService: UserService) { }

  room: Room = null;

  ngOnInit() {
  }

  newRoom() {
    this.userService.setUser().subscribe(value => {
      this.roomService.newRoom().subscribe((value => {
        this.room = value;
      }));
    });
  }
}
