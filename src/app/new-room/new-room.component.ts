import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {Room} from "../types/Room";
import {UserService} from "../user.service";
import {User} from "../types/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  constructor(private roomService: RoomService,
              private userService: UserService,
              private router: Router) { }

  room: Room = null;
  currentUser: User = null;
  username: string = "";

  ngOnInit() {
    this.userService.getUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  newRoom() {
    if (this.currentUser == null) {
      let user: User = new User();
      user.name = this.username;

      this.userService.setUser(user).subscribe((val => {
        this.roomService.newRoom().subscribe((value => {
          this.room = value;

        }));
      }));
    } else {
      this.roomService.newRoom().subscribe((value => {
        this.room = value;
      }));
    }
  }

  goToRoom() {
    this.roomService.updateRoom(this.room);
    this.router.navigate(["/room", this.room.code]);
    // Redirect to page.
  }
}
