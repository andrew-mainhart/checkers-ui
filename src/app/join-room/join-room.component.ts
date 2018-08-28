import { Component, OnInit } from '@angular/core';
import {RoomService} from '../room.service';
import {UserService} from '../user.service';
import {Room} from '../types/Room';
import {User} from '../types/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  constructor(private roomService: RoomService,
              private userService: UserService,
              private router: Router) { }

  room: Room = null;
  currentUser: User = null;
  username = '';
  room_name = '';

  ngOnInit() {
    this.userService.getUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  submitUsername () {

    const user: User = new User();
    user.name = this.username;

    this.userService.setUser(user);
  }

  submitRoomName () {
    console.log(this.room_name);
    this.roomService.joinRoom(this.currentUser, this.room_name).subscribe((value => {
        if (value != null) {
          this.room = value;
          this.roomService.updateRoom(this.room);
          this.router.navigate(["/room", this.room.code]);
        }
    }), (error => {
      console.log (error);
    }));
  }

}
