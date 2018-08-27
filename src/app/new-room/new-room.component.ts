import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {Room} from "../types/Room";
import {UserService} from "../user.service";
import {User} from "../types/User";

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  constructor(private roomService: RoomService,
              private userService: UserService) { }

  room: Room = null;
  currentUser: User = null;

  ngOnInit() {
    this.userService.getUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  newRoom() {
      this.roomService.newRoom().subscribe((value => {
        this.room = value;
      }));

  }
}
